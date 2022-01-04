using System.Threading.Tasks;
using AccuWeather.Persistence.Models;

namespace AccuWeather.Persistence.Repositories
{
    public interface ICityRepository : IRepository<City>
    {
        Task<City> GetLastAccessedCityAsync();
        Task InsertOrUpdateCityAsync(City city);
    }
}
