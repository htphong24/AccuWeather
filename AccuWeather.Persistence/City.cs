using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccuWeather.Persistence
{
    public partial class City
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string CountryId { get; set; }
        public DateTimeOffset AccessedDate { get; set; }
    }
}
