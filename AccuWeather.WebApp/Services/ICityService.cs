using System.Threading.Tasks;
using AccuWeather.Persistence;
using AccuWeather.Persistence.Models;

namespace AccuWeather.WebApp.Services
{
    public interface ICityService
    {
        Task<City> GetLastAccessedCityAsync();
        Task UpdateLastAccessedCityAsync(City city);
    }
}