import type { MetadataRoute } from "next";

const LAUNCH_DATE = "2026-03-15";

function getPastDailies(): { url: string; date: string }[] {
  const base = "https://foolsguess.com";
  const dates: { url: string; date: string }[] = [];
  const today = new Date().toISOString().slice(0, 10);
  const current = new Date(LAUNCH_DATE + "T00:00:00Z");

  while (current.toISOString().slice(0, 10) < today) {
    const dateStr = current.toISOString().slice(0, 10);
    dates.push({ url: `${base}/daily/${dateStr}`, date: dateStr });
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return dates;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://foolsguess.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/play/daily`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/play/solo`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/play/party`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/daily`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${base}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${base}/auth/register`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const dailyPages: MetadataRoute.Sitemap = getPastDailies().map(({ url, date }) => ({
    url,
    lastModified: new Date(date + "T23:59:59Z"),
    changeFrequency: "never" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...dailyPages];
}
