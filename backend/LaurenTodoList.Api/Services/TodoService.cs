using LaurenTodoList.Api.Interfaces;
using LaurenTodoList.Api.Models;

namespace LaurenTodoList.Api.Services;

public class TodoService : ITodoService
{
    private readonly ITodoRepository _repository;
    private readonly ILogger<TodoService> _logger;

    public TodoService(ITodoRepository repository, ILogger<TodoService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<IEnumerable<TodoItem>> GetAllTodosAsync()
    {
        try
        {
            var todos = await _repository.GetAllTodosAsync();
            _logger.ZLogInformation($"Retrieved {todos.Count()} todos");
            return todos;
        }
        catch (Exception ex)
        {
            _logger.ZLogError(ex, $"Error retrieving todos");
            throw;
        }
    }

    public async Task<IEnumerable<TodoItem>> GetTodosByDateAsync(DateTime date)
    {
        try
        {
            var todos = await _repository.GetTodosByDateAsync(date);
            _logger.ZLogInformation($"Retrieved {todos.Count()} todos for date {date:yyyy-MM-dd}");
            return todos;
        }
        catch (Exception ex)
        {
            _logger.ZLogError(ex, $"Error retrieving todos for date {date:yyyy-MM-dd}");
            throw;
        }
    }

    public async Task<IEnumerable<TodoItem>> GetUncompletedTodosBeforeDateAsync(DateTime date)
    {
        try
        {
            var todos = await _repository.GetUncompletedTodosBeforeDateAsync(date);
            _logger.ZLogInformation($"Retrieved {todos.Count()} uncompleted todos before {date:yyyy-MM-dd}");
            return todos;
        }
        catch (Exception ex)
        {
            _logger.ZLogError(ex, $"Error retrieving uncompleted todos before {date:yyyy-MM-dd}");
            throw;
        }
    }

    public async Task<TodoItem?> GetTodoByIdAsync(string id)
    {
        try
        {
            var todo = await _repository.GetTodoByIdAsync(id);
            _logger.ZLogInformation($"Retrieved todo with id {id}");
            return todo;
        }
        catch (Exception ex)
        {
            _logger.ZLogError(ex, $"Error retrieving todo with id {id}");
            throw;
        }
    }

    public async Task<TodoItem> AddTodoAsync(TodoItem todo)
    {
        try
        {
            var addedTodo = await _repository.AddTodoAsync(todo);
            _logger.ZLogInformation($"Added todo with id {addedTodo.Id}");
            return addedTodo;
        }
        catch (Exception ex)
        {
            _logger.ZLogError(ex, $"Error adding todo");
            throw;
        }
    }

    public async Task<bool> UpdateTodoAsync(TodoItem todo)
    {
        try
        {
            var result = await _repository.UpdateTodoAsync(todo);
            _logger.ZLogInformation($"Updated todo with id {todo.Id}. Result: {result}");
            return result;
        }
        catch (Exception ex)
        {
            _logger.ZLogError(ex, $"Error updating todo with id {todo.Id}");
            throw;
        }
    }

    public async Task<bool> DeleteTodoAsync(string id)
    {
        try
        {
            var result = await _repository.DeleteTodoAsync(id);
            _logger.ZLogInformation($"Deleted todo with id {id}. Result: {result}");
            return result;
        }
        catch (Exception ex)
        {
            _logger.ZLogError(ex, $"Error deleting todo with id {id}");
            throw;
        }
    }
}
