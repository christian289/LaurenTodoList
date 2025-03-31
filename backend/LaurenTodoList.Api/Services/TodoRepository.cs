using LaurenTodoList.Api.Interfaces;
using LaurenTodoList.Api.Models;

namespace LaurenTodoList.Api.Services;

public class TodoRepository : ITodoRepository
{
    private readonly IDatabase _database;
    private readonly ILogger<TodoRepository> _logger;

    public TodoRepository(IDatabase database, ILogger<TodoRepository> logger)
    {
        _database = database;
        _logger = logger;
    }

    public async Task<IEnumerable<TodoItem>> GetAllTodosAsync()
    {
        return await _database.GetAllTodosAsync();
    }

    public async Task<IEnumerable<TodoItem>> GetTodosByDateAsync(DateTime date)
    {
        var startDate = date.Date;
        var endDate = startDate.AddDays(1).AddTicks(-1);
        return await _database.GetTodosByDateAsync(startDate, endDate);
    }

    public async Task<IEnumerable<TodoItem>> GetUncompletedTodosBeforeDateAsync(DateTime date)
    {
        return await _database.GetUncompletedTodosBeforeDateAsync(date.Date);
    }

    public async Task<TodoItem?> GetTodoByIdAsync(string id)
    {
        return await _database.GetTodoByIdAsync(id);
    }

    public async Task<TodoItem> AddTodoAsync(TodoItem todo)
    {
        if (string.IsNullOrEmpty(todo.Id))
        {
            todo.Id = Ulid.NewUlid().ToString();
        }
        
        return await _database.InsertTodoAsync(todo);
    }

    public async Task<bool> UpdateTodoAsync(TodoItem todo)
    {
        return await _database.UpdateTodoAsync(todo);
    }

    public async Task<bool> DeleteTodoAsync(string id)
    {
        return await _database.DeleteTodoAsync(id);
    }
}