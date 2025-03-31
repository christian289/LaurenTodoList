using TodoApp.Api.Interfaces;
using TodoApp.Api.Services;

var builder = WebApplication.CreateSlimBuilder(args);

// CORS 설정
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 서비스 등록
builder.Services.AddSingleton<IDatabase>(provider => new DatabaseService("Filename=./todo.db;Mode=Shared"));
builder.Services.AddSingleton<ITodoRepository, TodoRepository>();
builder.Services.AddSingleton<ITodoService, TodoService>();
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowLocalhost");
app.MapControllers();

app.Run("http://localhost:5000");