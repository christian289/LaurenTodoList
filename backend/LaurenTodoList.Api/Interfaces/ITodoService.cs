using LaurenTodoList.Api.Models;

namespace LaurenTodoList.Api.Interfaces;

public interface ITodoService
{
    Task<IEnumerable<TodoItem>> GetAllTodosAsync();
    Task<IEnumerable<TodoItem>> GetTodosByDateAsync(DateTime date);
    Task<IEnumerable<TodoItem>> GetUncompletedTodosBeforeDateAsync(DateTime date);
    Task<TodoItem?> GetTodoByIdAsync(string id);
    Task<TodoItem> AddTodoAsync(TodoItem todo);
    Task<bool> UpdateTodoAsync(TodoItem todo);
    Task<bool> DeleteTodoAsync(string id);
}