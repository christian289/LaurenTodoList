using Microsoft.AspNetCore.Mvc;
using System.Reactive.Linq;
using TodoApp.Api.Interfaces;
using TodoApp.Api.Models;

namespace TodoApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly ITodoService _todoService;
    private readonly ILogger<TodoController> _logger;

    public TodoController(ITodoService todoService, ILogger<TodoController> logger)
    {
        _todoService = todoService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetAllTodos()
    {
        try
        {
            var todos = await _todoService.GetAllTodos().ToListAsync();
            return Ok(todos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting all todos");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("date/{date}")]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodosByDate(DateTime date)
    {
        try
        {
            var todos = await _todoService.GetTodosByDate(date).ToListAsync();
            return Ok(todos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting todos for date {date:yyyy-MM-dd}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("uncompleted/{date}")]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetUncompletedTodosBeforeDate(DateTime date)
    {
        try
        {
            var todos = await _todoService.GetUncompletedTodosBeforeDate(date).ToListAsync();
            return Ok(todos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting uncompleted todos before {date:yyyy-MM-dd}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoById(string id)
    {
        try
        {
            var todo = await _todoService.GetTodoByIdAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            return Ok(todo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting todo with id {id}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> AddTodo(TodoItem todo)
    {
        try
        {
            var addedTodo = await _todoService.AddTodoAsync(todo);
            return CreatedAtAction(nameof(GetTodoById), new { id = addedTodo.Id }, addedTodo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding todo");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodo(string id, TodoItem todo)
    {
        if (id != todo.Id)
        {
            return BadRequest();
        }

        try
        {
            var result = await _todoService.UpdateTodoAsync(todo);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error updating todo with id {id}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(string id)
    {
        try
        {
            var result = await _todoService.DeleteTodoAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error deleting todo with id {id}");
            return StatusCode(500, "Internal server error");
        }
    }
}