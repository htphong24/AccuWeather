using System;
using System.Collections.Generic;
using System.Text;
using AccuWeather.Persistence.Config;
using AccuWeather.Persistence.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace AccuWeather.Persistence.Repositories
{
    public class DbContextFactory : IDbContextFactory, IDisposable
    {
        /// <summary>
        /// Create Db context with connection string
        /// </summary>
        /// <param name="settings"></param>
        public DbContextFactory(IOptions<DbContextSettings> settings)
        {
            var options = new DbContextOptionsBuilder<WeatherDbContext>().UseSqlServer(settings.Value.DbConnectionString).Options;
            DbContext = new WeatherDbContext(options);
        }

        /// <summary>
        /// Call Dispose to release DbContext
        /// </summary>
        ~DbContextFactory()
        {
            Dispose();
        }

        public WeatherDbContext DbContext { get; private set; }
        /// <summary>
        /// Release DB context
        /// </summary>
        public void Dispose()
        {
            DbContext?.Dispose();
        }
    }
}
