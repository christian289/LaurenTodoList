using LaurenTodoList.Api.Interfaces;
using LaurenTodoList.Api.Models;

namespace LaurenTodoList.Api.Services;

public class DatabaseService : IDatabase
{
    private readonly string _connectionString;
    private readonly ILogger<DatabaseService> _logger;

    public DatabaseService(string connectionString, ILogger<DatabaseService> logger)
    {
        _connectionString = connectionString;
        _logger = logger;
        
        // 데이터베이스 초기화 (컬렉션이 없으면 생성)
        InitializeDatabase();
    }

    private void InitializeDatabase()
    {
        using var db = new LiteDatabase(_connectionString);
        var collection = db.GetCollection<TodoItem>("todos");

        // BsonId로 Id 필드를 인덱싱
        collection.EnsureIndex(x => x.Id);

        // 날짜별 쿼리를 위한 인덱스
        collection.EnsureIndex(x => x.DueDate);

        _logger.ZLogInformation($"Database initialized successfully");
    }

    public async Task<IEnumerable<TodoItem>> GetAllTodosAsync()
    {
        return await Task.Run(() => {
            using var db = new LiteDatabase(_connectionString);
            _logger.ZLogDebug($"Opening database connection for GetAllTodosAsync");
            
            var collection = db.GetCollection<TodoItem>("todos");
            var results = collection.FindAll().ToList();
            
            _logger.ZLogDebug($"Retrieved {results.Count} todo items");
            return results;
        });
    }

    public async Task<IEnumerable<TodoItem>> GetTodosByDateAsync(DateTime startDate, DateTime endDate)
    {
        return await Task.Run(() => {
            using var db = new LiteDatabase(_connectionString);
            _logger.ZLogDebug($"Opening database connection for GetTodosByDateAsync: {startDate} to {endDate}");
            
            var collection = db.GetCollection<TodoItem>("todos");
            var results = collection.Find(x => x.DueDate >= startDate && x.DueDate <= endDate).ToList();
            
            _logger.ZLogDebug($"Retrieved {results.Count} todo items between {startDate} and {endDate}");
            return results;
        });
    }

    public async Task<IEnumerable<TodoItem>> GetUncompletedTodosBeforeDateAsync(DateTime date)
    {
        return await Task.Run(() => {
            using var db = new LiteDatabase(_connectionString);
            _logger.ZLogDebug($"Opening database connection for GetUncompletedTodosBeforeDateAsync: before {date}");
            
            var collection = db.GetCollection<TodoItem>("todos");
            var results = collection.Find(x => x.DueDate < date && !x.IsCompleted).ToList();
            
            _logger.ZLogDebug($"Retrieved {results.Count} uncompleted todo items before {date}");
            return results;
        });
    }

    public async Task<TodoItem?> GetTodoByIdAsync(string id)
    {
        return await Task.Run(() => {
            using var db = new LiteDatabase(_connectionString);
            _logger.ZLogDebug($"Opening database connection for GetTodoByIdAsync: {id}");
            
            var collection = db.GetCollection<TodoItem>("todos");
            var result = collection.FindById(id);
            
            if (result == null)
            {
                _logger.ZLogDebug($"Todo item with ID {id} not found");
            }
            else
            {
                _logger.ZLogDebug($"Retrieved todo item with ID {id}");
            }
            
            return result;
        });
    }

    public async Task<TodoItem> InsertTodoAsync(TodoItem todo)
    {
        return await Task.Run(() => {
            using var db = new LiteDatabase(_connectionString);
            _logger.ZLogDebug($"Opening database connection for InsertTodoAsync: {todo.Id}");
            
            var collection = db.GetCollection<TodoItem>("todos");
            
            todo.CreatedAt = DateTime.Now;
            
            collection.Insert(todo);
            _logger.ZLogInformation($"Inserted new todo item with ID {todo.Id}");
            
            return todo;
        });
    }

    public async Task<bool> UpdateTodoAsync(TodoItem todo)
    {
        return await Task.Run(() => {
            using var db = new LiteDatabase(_connectionString);
            _logger.ZLogDebug($"Opening database connection for UpdateTodoAsync: {todo.Id}");
            
            var collection = db.GetCollection<TodoItem>("todos");
            var result = collection.Update(todo);
            
            if (result)
            {
                _logger.ZLogInformation($"Updated todo item with ID {todo.Id}");
            }
            else
            {
                _logger.ZLogWarning($"Failed to update todo item with ID {todo.Id} - item not found");
            }
            
            return result;
        });
    }

    public async Task<bool> DeleteTodoAsync(string id)
    {
        return await Task.Run(() => {
            using var db = new LiteDatabase(_connectionString);
            _logger.ZLogDebug($"Opening database connection for DeleteTodoAsync: {id}");
            
            var collection = db.GetCollection<TodoItem>("todos");
            var result = collection.Delete(id);
            
            if (result)
            {
                _logger.ZLogInformation($"Deleted todo item with ID {id}");
            }
            else
            {
                _logger.ZLogWarning($"Failed to delete todo item with ID {id} - item not found");
            }
            
            return result;
        });
    }
}