using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccuWeather.Persistence;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Web.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService _service;
        private readonly ILogger _logger;
        public CitiesController(ICityService service, ILogger logger)
        {
            _service = service;
            _logger = logger;
        }
        // GET api/cities
        [HttpGet]
        public async Task<ActionResult<City>> Get()
        {
            var city = await _service.GetLastAccessedCityAsync();
            return city;
        }
        // POST api/cities
        [HttpPost]
        public async Task Post([FromBody] City city)
        {
            await _service.UpdateLastAccessedCityAsync(city);
        }
    }
}
