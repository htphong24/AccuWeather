using System;
using System.Collections.Generic;
using System.Text;

namespace AccuWeather.Persistence.Models
{
    public partial class City
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string CountryId { get; set; }
        public DateTimeOffset AccessedDate { get; set; }
    }
}
