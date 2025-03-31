using System.Data.SqlClient;
using Dapper;
using LiteDB;
using Microsoft.Extensions.Logging;
using SqlKata.Compilers;
using TodoApp.Api.Interfaces;

namespace TodoApp.Api.Services;

public class DatabaseService : IDatabase, IDisposable
{
    private readonly LiteDatabase _db;
    private readonly SqlCompiler _compiler;

    public DatabaseService(string connectionString)
    {
        _db = new LiteDatabase(connectionString);
        _compiler = new SqlCompiler();
    }

    public async Task<IEnumerable<T>> QueryAsync<T>(string query, object parameters = null)
    {
        return await Task.Run(() => {
            using var connection = new SqlConnection($"Filename={_db.ConnectionString}");
            return connection.Query<T>(query, parameters);
        });
    }

    public async Task<T> QueryFirstOrDefaultAsync<T>(string query, object parameters = null)
    {
        return await Task.Run(() => {
            using var connection = new SqlConnection($"Filename={_db.ConnectionString}");
            return connection.QueryFirstOrDefault<T>(query, parameters);
        });
    }

    public async Task<int> ExecuteAsync(string query, object parameters = null)
    {
        return await Task.Run(() => {
            using var connection = new SqlConnection($"Filename={_db.ConnectionString}");
            return connection.Execute(query, parameters);
        });
    }

    public void Dispose()
    {
        _db?.Dispose();
        GC.SuppressFinalize(this);
    }
}