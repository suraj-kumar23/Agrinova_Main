import { useEffect, useState } from "react";
import {
  CloudSun,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  MapPin,
  ThermometerSun,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// OpenWeatherMap API types
interface CurrentWeather {
  temp: number;
  weather: { main: string; description: string }[];
  wind_speed: number;
  humidity: number;
}

interface DailyWeather {
  dt: number;
  temp: { day: number };
  weather: { main: string; description: string }[];
}

interface WeatherApiResponse {
  current: CurrentWeather;
  daily: DailyWeather[];
}

interface WeatherData {
  temp: number;
  condition: string;
  windSpeed: number;
  humidity: number;
}

interface ForecastData {
  day: string;
  temp: number;
  condition: string;
}

// Map weather condition to icons
const weatherIconMap: Record<string, JSX.Element> = {
  Clear: <Sun className="h-5 w-5 text-yellow-500" />,
  Clouds: <CloudSun className="h-5 w-5 text-gray-500" />,
  Rain: <CloudRain className="h-5 w-5 text-blue-500" />,
};

export default function Weather() {
  const [location, setLocation] = useState<string>("Detecting...");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weeklyForecast, setWeeklyForecast] = useState<ForecastData[]>([]);

  const OPENWEATHER_API_KEY = "15a089805b00267c8ec096f2affffe39";

  // Fetch weather by coordinates
  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${OPENWEATHER_API_KEY}`
      );
      const data: WeatherApiResponse = await res.json();

      // Set current weather
      setWeather({
        temp: Math.round(data.current.temp),
        condition: data.current.weather[0].main,
        windSpeed: data.current.wind_speed,
        humidity: data.current.humidity,
      });

      // Set weekly forecast
      const weekly = data.daily.slice(1, 8).map((day: DailyWeather) => ({
        day: new Date(day.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        temp: Math.round(day.temp.day),
        condition: day.weather[0].main,
      }));
      setWeeklyForecast(weekly);
    } catch (error) {
      console.error("Weather API Error:", error);
    }
  };

  // Detect user location
  useEffect(() => {
    document.title = "Weather Forecast - AgriSmart";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);

          // Reverse geocoding for city name
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
            .then((res) => res.json())
            .then(
              (data: {
                city?: string;
                locality?: string;
                countryName?: string;
              }) =>
                setLocation(
                  `${data.city || data.locality || "Unknown"}, ${
                    data.countryName || ""
                  }`
                )
            )
            .catch(() => setLocation("Unknown location"));
        },
        () => setLocation("Location denied")
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Weather Forecast</h1>
        <p className="text-gray-600">
          7-day weather forecast for your farm location
        </p>
      </div>

      {/* Today's Weather */}
      {weather && (
        <Card className="mb-6 bg-gradient-to-r from-sky-50 to-blue-100">
          <CardHeader>
            <CardTitle>Today's Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              {/* Temperature */}
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  {weatherIconMap[weather.condition] || (
                    <Sun className="h-8 w-8 text-yellow-500" />
                  )}
                </div>
                <div>
                  <p className="text-2xl font-bold">{weather.temp}°C</p>
                  <p className="text-sm text-gray-600">{weather.condition}</p>
                </div>
              </div>

              {/* Wind */}
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Wind className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{weather.windSpeed} km/h</p>
                  <p className="text-sm text-gray-600">Wind Speed</p>
                </div>
              </div>

              {/* Humidity */}
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Droplets className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{weather.humidity}%</p>
                  <p className="text-sm text-gray-600">Humidity</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <MapPin className="h-8 w-8 text-red-500" />
                </div>
                <div>
                  <p className="text-lg font-bold">{location}</p>
                  <p className="text-sm text-gray-600">Your Location</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Forecast */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {weeklyForecast.map((forecast) => (
          <Card
            key={forecast.day}
            className="bg-gradient-to-br from-sky-50 to-blue-100"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {forecast.day}
              </CardTitle>
              {weatherIconMap[forecast.condition] || (
                <Sun className="h-4 w-4 text-gray-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{forecast.temp}°C</div>
              <div className="text-sm text-gray-600">{forecast.condition}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Temperature Trend AreaChart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Weekly Temperature Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-72"> {/* Fixed height for chart */}
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyForecast}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#3b82f6"
                  fill="rgba(59, 130, 246, 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Static Advisory & Monthly Overview */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agriculture Advisory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <ThermometerSun className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <p className="font-medium text-green-800">Optimal Conditions</p>
                  <p className="text-sm text-gray-600">
                    Current weather conditions are ideal for wheat cultivation.
                    Consider irrigation in the evening.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                <CloudSun className="h-5 w-5 text-yellow-600 mt-1" />
                <div>
                  <p className="font-medium text-yellow-800">Weather Alert</p>
                  <p className="text-sm text-gray-600">
                    Light rainfall expected next week. Plan your harvesting
                    activities accordingly.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Avg. Temperature</p>
                  <p className="text-2xl font-bold text-blue-700">29°C</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Rainfall</p>
                  <p className="text-2xl font-bold text-green-700">85mm</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                This month shows above-average temperatures and normal
                precipitation levels, ideal for current crop growth stages.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
