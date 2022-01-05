using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccuWeather.Persistence;
using AccuWeather.Persistence.Models;
using AccuWeather.Persistence.Repositories;
using Serilog;

namespace AccuWeather.WebApp.Services
{
    public class CityService : ICityService
    {
        private readonly ICityRepository _repository;
        private readonly ILogger _logger;
        public CityService(ICityRepository repository, ILogger logger)
        {
            _repository = repository;
            _logger = logger;
        }
        /// <summary>
        /// GetLastAccessedCityAsync
        /// </summary>
        /// <returns>City</returns>

        public async Task<City> GetLastAccessedCityAsync()
        {
            var city = await _repository.GetLastAccessedCityAsync();
            return city;
        }

        /// <summary>
        /// UpdateLastAccessedCityAsync
        /// </summary>
        /// <param name="city"></param>
        /// <returns></returns>
        public async Task UpdateLastAccessedCityAsync(City city)
        {
            city.AccessedDate = DateTimeOffset.UtcNow;
            await _repository.InsertOrUpdateCityAsync(city);
        }
    }
}
