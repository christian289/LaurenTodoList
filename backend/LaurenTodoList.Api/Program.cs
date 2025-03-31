using LaurenTodoList.Api;
using LaurenTodoList.Api.Interfaces;
using LaurenTodoList.Api.Models;
using LaurenTodoList.Api.Services;
using ZLogger.Providers;

var builder = WebApplication.CreateBuilder(args);

// 로깅 설정 (ZLogger)
builder.Logging.ClearProviders();
builder.Logging.SetMinimumLevel(LogLevel.Information);
builder.Logging.AddZLoggerConsole();
builder.Logging.AddZLoggerFile("logs/app.log");
builder.Logging.AddZLoggerRollingFile(options =>
{
    options.FilePathSelector = (timestamp, sequenceNumber) => $"logs/{timestamp.ToLocalTime():yyyy-MM-dd}_{sequenceNumber:000}.log";
    options.RollingInterval = RollingInterval.Day;
    options.RollingSizeKB = 1024;
});
//builder.Logging.AddZLoggerInMemory(processor =>
//{
//    processor.MessageReceived += renderedLogString =>
//    {
//        System.Console.WriteLine(renderedLogString);
//    };
//});

// 인메모리 캐시 설정
builder.Services.AddMemoryCache();
builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(policy => policy.Expire(TimeSpan.FromMinutes(10)));
});

// OpenAPI 설정
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi("lauren_todo_api");

// CORS 설정
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // localhost:3000에서 요청을 허용한다. React.JS, Next.JS의 프론트앤드 앱은 일반적으로 3000번 포트를 사용하기 때문에 허용.
              .AllowAnyHeader() // 모든 HTTP 헤더를 허용한다.
              .AllowAnyMethod(); // 모든 HTTP Method를 허용한다. Get, Post, Put, Delete 등
    });
});

// JSON 직렬화 설정
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, SourceGenerationContext.Default);
    options.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.SerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
});

// 데이터베이스 연결 문자열
var dbConnectionString = Path.Combine(builder.Environment.ContentRootPath, "lauren_todo.db");

// 서비스 등록
builder.Services.AddSingleton<IDatabase>(provider => new DatabaseService(dbConnectionString, provider.GetRequiredService<ILogger<DatabaseService>>()));
builder.Services.AddSingleton<ITodoRepository, TodoRepository>();
builder.Services.AddSingleton<ITodoService, TodoService>();

// 구성 파일 로드
builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);
}

// 빌드
var app = builder.Build();

app.UseOutputCache();
app.UseCors("AllowNextJS");
app.UseCors("AllowLocalhost");

// 개발 환경에서 상세 오류 정보 표시
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    // 기본 Endpoints: /openapi/{documentName}/openapi.json
    // https://learn.microsoft.com/ko-kr/aspnet/core/fundamentals/openapi/aspnetcore-openapi?view=aspnetcore-9.0&tabs=visual-studio#customize-the-openapi-document-name
    app.MapOpenApi().CacheOutput();
}

// API 엔드포인트 정의
var todoApi = app.MapGroup("/api/todo")
    .WithTags("Todo"); // OpenAPI 태그 추가

// 모든 할 일 가져오기
todoApi.MapGet("/", async (ITodoService todoService) =>
{
    try
    {
        var todos = await todoService.GetAllTodosAsync();
        return Results.Ok(todos);
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error getting all todos: {ex.Message}");
    }
})
.WithName("GetAllTodos") // 작업 이름 추가
.WithDescription("Retrieves all todo items"); // 작업 설명 추가

// 날짜별 할 일 가져오기
todoApi.MapGet("/date/{date}", async (DateTime date, ITodoService todoService) =>
{
    try
    {
        var todos = await todoService.GetTodosByDateAsync(date);
        return Results.Ok(todos);
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error getting todos for date {date:yyyy-MM-dd}: {ex.Message}");
    }
})
.WithName("GetTodosByDate")
.WithDescription("Retrieves todo items for a specific date");

// 특정 날짜 이전의 미완료 할 일 가져오기
todoApi.MapGet("/uncompleted/{date}", async (DateTime date, ITodoService todoService) =>
{
    try
    {
        var todos = await todoService.GetUncompletedTodosBeforeDateAsync(date);
        return Results.Ok(todos);
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error getting uncompleted todos before {date:yyyy-MM-dd}: {ex.Message}");
    }
})
.WithName("GetUncompletedTodosBeforeDate")
.WithDescription("Retrieves uncompleted todo items before a specific date");

// ID로 특정 할 일 가져오기
todoApi.MapGet("/{id}", async (string id, ITodoService todoService) =>
{
    try
    {
        var todo = await todoService.GetTodoByIdAsync(id);
        if (todo == null)
        {
            return Results.NotFound();
        }
        return Results.Ok(todo);
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error getting todo with id {id}: {ex.Message}");
    }
})
.WithName("GetTodoById")
.WithDescription("Retrieves a specific todo item by ID");

// 새 할 일 추가
todoApi.MapPost("/", async (TodoItem todo, ITodoService todoService) =>
{
    try
    {
        var addedTodo = await todoService.AddTodoAsync(todo);
        return Results.Created($"/api/todo/{addedTodo.Id}", addedTodo);
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error adding todo: {ex.Message}");
    }
})
.WithName("CreateTodo")
.WithDescription("Creates a new todo item");

// 기존 할 일 업데이트
todoApi.MapPut("/{id}", async (string id, TodoItem todo, ITodoService todoService) =>
{
    if (id != todo.Id)
    {
        return Results.BadRequest("ID mismatch");
    }

    try
    {
        var result = await todoService.UpdateTodoAsync(todo);
        if (!result)
        {
            return Results.NotFound();
        }
        return Results.NoContent();
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error updating todo with id {id}: {ex.Message}");
    }
})
.WithName("UpdateTodo")
.WithDescription("Updates an existing todo item");

// 할 일 삭제
todoApi.MapDelete("/{id}", async (string id, ITodoService todoService) =>
{
    try
    {
        var result = await todoService.DeleteTodoAsync(id);
        if (!result)
        {
            return Results.NotFound();
        }
        return Results.NoContent();
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error deleting todo with id {id}: {ex.Message}");
    }
})
.WithName("DeleteTodo")
.WithDescription("Deletes a todo item");

app.Run();