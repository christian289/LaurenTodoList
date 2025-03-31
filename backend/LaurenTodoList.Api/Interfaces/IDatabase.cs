using LaurenTodoList.Api.Models;

namespace LaurenTodoList.Api.Interfaces;

public interface IDatabase
{
    Task<IEnumerable<TodoItem>> GetAllTodosAsync();
    Task<IEnumerable<TodoItem>> GetTodosByDateAsync(DateTime startDate, DateTime endDate);
    Task<IEnumerable<TodoItem>> GetUncompletedTodosBeforeDateAsync(DateTime date);
    Task<TodoItem?> GetTodoByIdAsync(string id);
    Task<TodoItem> InsertTodoAsync(TodoItem todo);
    Task<bool> UpdateTodoAsync(TodoItem todo);
    Task<bool> DeleteTodoAsync(string id);
}