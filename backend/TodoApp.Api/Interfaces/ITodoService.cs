using TodoApp.Api.Models;

namespace TodoApp.Api.Interfaces;

public interface ITodoService
{
    IObservable<IEnumerable<TodoItem>> GetAllTodos();
    IObservable<IEnumerable<TodoItem>> GetTodosByDate(DateTime date);
    IObservable<IEnumerable<TodoItem>> GetUncompletedTodosBeforeDate(DateTime date);
    Task<TodoItem> GetTodoByIdAsync(string id);
    Task<TodoItem> AddTodoAsync(TodoItem todo);
    Task<bool> UpdateTodoAsync(TodoItem todo);
    Task<bool> DeleteTodoAsync(string id);
}