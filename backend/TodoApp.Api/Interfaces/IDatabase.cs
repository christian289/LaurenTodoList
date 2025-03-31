namespace TodoApp.Api.Interfaces;

public interface IDatabase
{
    Task<IEnumerable<T>> QueryAsync<T>(string query, object parameters = null);
    Task<T> QueryFirstOrDefaultAsync<T>(string query, object parameters = null);
    Task<int> ExecuteAsync(string query, object parameters = null);
}