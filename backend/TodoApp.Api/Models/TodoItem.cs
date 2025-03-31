using Cysharp.Ulid;

namespace TodoApp.Api.Models;

public class TodoItem
{
    public string Id { get; set; } = Ulid.NewUlid().ToString();
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime DueDate { get; set; } = DateTime.Now;
    public bool IsCompleted { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? CompletedAt { get; set; }
}