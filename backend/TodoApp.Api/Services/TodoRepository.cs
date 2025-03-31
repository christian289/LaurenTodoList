using Microsoft.Extensions.Logging;
using Cysharp.Ulid;
using System.Reactive.Linq;
using TodoApp.Api.Interfaces;
using TodoApp.Api.Models;

namespace TodoApp.Api.Services;

public class TodoRepository : ITodoRepository
{
    private readonly IDatabase _database;
    private readonly ILogger<TodoRepository> _logger;

    public TodoRepository(IDatabase database, ILogger<TodoRepository> logger)
    {
        _database = database;
        _logger = logger;
    }

    public IObservable<IEnumerable<TodoItem>> GetAllTodos()
    {
        return Observable.FromAsync(async () => {
            var query = "SELECT * FROM TodoItems ORDER BY DueDate DESC";
            return await _database.QueryAsync<TodoItem>(query);
        });
    }

    public IObservable<IEnumerable<TodoItem>> GetTodosByDate(DateTime date)
    {
        return Observable.FromAsync(async () => {
            var startDate = date.Date;
            var endDate = startDate.AddDays(1).AddTicks(-1);
            
            var query = "SELECT * FROM TodoItems WHERE DueDate >= @startDate AND DueDate <= @endDate ORDER BY DueDate";
            return await _database.QueryAsync<TodoItem>(query, new { startDate, endDate });
        });
    }

    public IObservable<IEnumerable<TodoItem>> GetUncompletedTodosBeforeDate(DateTime date)
    {
        return Observable.FromAsync(async () => {
            var query = "SELECT * FROM TodoItems WHERE DueDate < @date AND IsCompleted = 0 ORDER BY DueDate";
            return await _database.QueryAsync<TodoItem>(query, new { date = date.Date });
        });
    }

    public async Task<TodoItem> GetTodoByIdAsync(string id)
    {
        var query = "SELECT * FROM TodoItems WHERE Id = @id";
        return await _database.QueryFirstOrDefaultAsync<TodoItem>(query, new { id });
    }

    public async Task<TodoItem> AddTodoAsync(TodoItem todo)
    {
        if (string.IsNullOrEmpty(todo.Id))
        {
            todo.Id = Ulid.NewUlid().ToString();
        }
        
        todo.CreatedAt = DateTime.Now;
        
        var query = @"INSERT INTO TodoItems (Id, Title, Description, DueDate, IsCompleted, CreatedAt, CompletedAt) 
                     VALUES (@Id, @Title, @Description, @DueDate, @IsCompleted, @CreatedAt, @CompletedAt)";
        
        await _database.ExecuteAsync(query, todo);
        return todo;
    }

    public async Task<bool> UpdateTodoAsync(TodoItem todo)
    {
        var query = @"UPDATE TodoItems SET 
                     Title = @Title, 
                     Description = @Description, 
                     DueDate = @DueDate, 
                     IsCompleted = @IsCompleted, 
                     CompletedAt = @CompletedAt 
                     WHERE Id = @Id";
        
        var result = await _database.ExecuteAsync(query, todo);
        return result > 0;
    }

    public async Task<bool> DeleteTodoAsync(string id)
    {
        var query = "DELETE FROM TodoItems WHERE Id = @id";
        var result = await _database.ExecuteAsync(query, new { id });
        return result > 0;
    }
}