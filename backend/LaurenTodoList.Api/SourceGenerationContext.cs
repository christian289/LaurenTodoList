using LaurenTodoList.Api.Models;

namespace LaurenTodoList.Api;

[JsonSourceGenerationOptions(WriteIndented = true, DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull)]
[JsonSerializable(typeof(ProblemDetails))] // 추가 AspNetCore MVC 관련하여 추가해야 함.
[JsonSerializable(typeof(ValidationProblemDetails))] // 추가 AspNetCore MVC 관련하여 추가해야 함.
[JsonSerializable(typeof(TodoItem))]
[JsonSerializable(typeof(IEnumerable<TodoItem>))]
public partial class SourceGenerationContext : JsonSerializerContext
{
}
