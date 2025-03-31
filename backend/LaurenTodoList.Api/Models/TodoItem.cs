using System.Diagnostics.CodeAnalysis;

namespace LaurenTodoList.Api.Models;

public class TodoItem
{
    /// <summary>
    /// 할 일 고유 식별자
    /// </summary>
    [BsonId]
    [Required]
    [JsonPropertyName("id")]
    public string Id { get; set; } = Ulid.NewUlid().ToString();
    
    /// <summary>
    /// 할 일 제목
    /// </summary>
    [Required]
    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// 할 일 설명
    /// </summary>
    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
    
    /// <summary>
    /// 할 일 마감일
    /// </summary>
    [Required]
    [JsonPropertyName("dueDate")]
    public DateTime DueDate { get; set; } = DateTime.Now;

    /// <summary>
    /// 완료 여부
    /// </summary>
    [JsonPropertyName("isCompleted")]
    public bool IsCompleted { get; set; } = false;

    /// <summary>
    /// 생성일
    /// </summary>
    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    /// <summary>
    /// 완료일
    /// </summary>
    [JsonPropertyName("completedAt")]
    public DateTime? CompletedAt { get; set; }
}