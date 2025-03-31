using Microsoft.Extensions.Logging;
using System.Reactive.Linq;
using TodoApp.Api.Interfaces;
using TodoApp.Api.Models;

namespace TodoApp.Api.Services;

public class TodoService : ITodoService
{
    private readonly ITodoRepository _repository;
    private readonly ILogger<TodoService> _logger;

    public TodoService(ITodoRepository repository, ILogger<TodoService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public IObservable<IEnumerable<TodoItem>> GetAllTodos()
    {
        return _repository.GetAllTodos()
            .Do(
                todos => _logger.LogInformation($"Retrieved {todos.Count()} todos"),
                ex => _logger.LogError(ex, "Error retrieving todos")
            );
    }

    public IObservable<IEnumerable<TodoItem>> GetTodosByDate(DateTime date)
    {
        return _repository.GetTodosByDate(date)
            .Do(
                todos => _logger.LogInformation($"Retrieved {todos.Count()} todos for date {date:yyyy-MM-dd}"),
                ex => _logger.LogError(ex, $"Error retrieving todos for date {date:yyyy-MM-dd}")
            );
    }

    public IObservable<IEnumerable<TodoItem>> GetUncompletedTodosBeforeDate(DateTime date)
    {
        return _repository.GetUncompletedTodosBeforeDate(date)
            .Do(
                todos => _logger.LogInformation($"Retrieved {todos.Count()} uncompleted todos before {date:yyyy-MM-dd}"),
                ex => _logger.LogError(ex, $"Error retrieving uncompleted todos before {date:yyyy-MM-dd}")
            );
    }

    public async Task<TodoItem> GetTodoByIdAsync(string id)
    {
        try
        {
            var todo = await _repository.GetTodoByIdAsync(id);
            _logger.LogInformation($"Retrieved todo with id {id}");
            return todo;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error retrieving todo with id {id}");
            throw;
        }
    }

    public async Task<TodoItem> AddTodoAsync(TodoItem todo)
    {
        try
        {
            var addedTodo = await _repository.AddTodoAsync(todo);
            _logger.LogInformation($"Added todo with id {addedTodo.Id}");
            return addedTodo;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding todo");
            throw;
        }
    }

    public async Task<bool> UpdateTodoAsync(TodoItem todo)
    {
        try
        {
            var result = await _repository.UpdateTodoAsync(todo);
            _logger.LogInformation($"Updated todo with id {todo.Id}. Result: {result}");
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error updating todo with id {todo.Id}");
            throw;
        }
    }

    public async Task<bool> DeleteTodoAsync(string id)
    {
        try
        {
            var result = await _repository.DeleteTodoAsync(id);
            _logger.LogInformation($"Deleted todo with id {id}. Result: {result}");
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error deleting todo with id {id}");
            throw;
        }
    }
}