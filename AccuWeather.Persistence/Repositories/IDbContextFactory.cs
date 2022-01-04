using System;
using System.Collections.Generic;
using System.Text;
using AccuWeather.Persistence.Models;

namespace AccuWeather.Persistence.Repositories
{
    public interface IDbContextFactory
    {
        WeatherDbContext DbContext { get; }
    }
}
