/**
 * National Weather Service API wrapper.
 *
 * api.weather.gov is a free US-government data source. No key required.
 * Rate-limited; we cache aggressively via Next.js ISR `revalidate`.
 *
 * The API requires a descriptive User-Agent. Include a contact URL per
 * their guidelines.
 */

const UA = "VisitBigSpring/1.0 (+https://visit-big-spring.vercel.app; info@visitbigspring.com)";

/** Big Spring, TX — downtown reference point. */
export const BIG_SPRING_LAT = 32.2504;
export const BIG_SPRING_LNG = -101.4787;

export type CurrentWeather = {
  /** Degrees Fahrenheit. */
  temperature: number;
  /** Short description, e.g. "Sunny", "Mostly Clear". */
  condition: string;
  /** NWS icon URL. */
  icon: string;
  /** e.g. "SW 10 mph". */
  wind: string;
  /** When this forecast period started. */
  start: string;
  /** When this forecast period ends. */
  end: string;
};

export type ForecastPeriod = CurrentWeather & {
  name: string; // "Tonight", "Monday", etc.
  isDaytime: boolean;
  shortForecast: string;
  detailedForecast: string;
};

type PointsResponse = {
  properties: {
    forecast: string;
    forecastHourly: string;
    relativeLocation?: { properties?: { city?: string; state?: string } };
  };
};

type ForecastResponse = {
  properties: {
    periods: Array<{
      number: number;
      name: string;
      startTime: string;
      endTime: string;
      isDaytime: boolean;
      temperature: number;
      temperatureUnit: string;
      windSpeed: string;
      windDirection: string;
      icon: string;
      shortForecast: string;
      detailedForecast: string;
    }>;
  };
};

/** 7-day cache on /points. The mapping to grid cells rarely changes. */
const POINTS_REVALIDATE = 60 * 60 * 24 * 7;
/** 30-minute cache on forecast endpoints, per user brief. */
const FORECAST_REVALIDATE = 60 * 30;

async function getForecastUrl(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(`https://api.weather.gov/points/${lat},${lng}`, {
      headers: { "User-Agent": UA, Accept: "application/geo+json" },
      next: { revalidate: POINTS_REVALIDATE },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as PointsResponse;
    return data.properties.forecast ?? null;
  } catch {
    return null;
  }
}

async function fetchPeriods(forecastUrl: string): Promise<ForecastPeriod[] | null> {
  try {
    const res = await fetch(forecastUrl, {
      headers: { "User-Agent": UA, Accept: "application/geo+json" },
      next: { revalidate: FORECAST_REVALIDATE },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as ForecastResponse;
    return data.properties.periods.map((p) => ({
      name: p.name,
      temperature: p.temperature,
      condition: p.shortForecast,
      icon: p.icon,
      wind: `${p.windDirection} ${p.windSpeed}`,
      start: p.startTime,
      end: p.endTime,
      isDaytime: p.isDaytime,
      shortForecast: p.shortForecast,
      detailedForecast: p.detailedForecast,
    }));
  } catch {
    return null;
  }
}

/**
 * Current weather for a point. Returns null on any failure so that the
 * UI can just render nothing and the page never breaks.
 */
export async function getCurrent(
  lat: number = BIG_SPRING_LAT,
  lng: number = BIG_SPRING_LNG,
): Promise<CurrentWeather | null> {
  const forecastUrl = await getForecastUrl(lat, lng);
  if (!forecastUrl) return null;
  const periods = await fetchPeriods(forecastUrl);
  if (!periods || periods.length === 0) return null;
  // NWS returns 14 periods (7 days × day/night). Period[0] is the most
  // current applicable period.
  const p = periods[0];
  return {
    temperature: p.temperature,
    condition: p.shortForecast,
    icon: p.icon,
    wind: p.wind,
    start: p.start,
    end: p.end,
  };
}

export const getCurrentForBigSpring = () => getCurrent();

/** Multi-day forecast. `days` refers to daytime periods (max 7). */
export async function getForecast(
  days: number = 3,
  lat: number = BIG_SPRING_LAT,
  lng: number = BIG_SPRING_LNG,
): Promise<ForecastPeriod[]> {
  const forecastUrl = await getForecastUrl(lat, lng);
  if (!forecastUrl) return [];
  const periods = await fetchPeriods(forecastUrl);
  if (!periods) return [];
  // Filter to daytime periods only.
  return periods.filter((p) => p.isDaytime).slice(0, days);
}

export const getForecastForBigSpring = (days = 3) => getForecast(days);

/**
 * A context-aware one-liner suggestion based on current conditions.
 * Used in hero chips and event cards.
 */
export function suggestionFor(w: CurrentWeather): string {
  const t = w.temperature;
  const c = w.condition.toLowerCase();

  if (c.includes("rain") || c.includes("storm") || c.includes("shower")) {
    return "Heritage Museum or Hangar 25 kind of day.";
  }
  if (c.includes("snow") || c.includes("ice")) {
    return "Stay in. Settles Grill is open.";
  }
  if (t >= 95) return "Shade at Comanche Trail Park; sunset at Scenic Mountain.";
  if (t >= 85) return "Perfect for the aquatic center or a late State Park loop.";
  if (t >= 65) return "Ideal for the Scenic Mountain loop road.";
  if (t >= 50) return "Perfect Heritage Museum weather.";
  if (t >= 35) return "Bundle up — sunset at Scenic Mountain is worth it.";
  return "Indoor kind of day. Museums are open.";
}
