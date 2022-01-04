using System.Threading.Tasks;
using AccuWeather.Persistence;

namespace Web.Services
{
    public interface ICityService
    {
        Task<City> GetLastAccessedCityAsync();
        Task UpdateLastAccessedCityAsync(City city);
    }
}