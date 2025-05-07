import { chromium } from "playwright";
import type { NextApiRequest, NextApiResponse } from "next";

interface Standing {
  position: number;
  team: string;
  matches: number;
  wins: number;
  losses: number;
  points: number;
  netRunRate: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    standings?: Standing[];
    error?: string;
  }>
) {
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        "--disable-blink-features=AutomationControlled",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });

    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      viewport: { width: 1280, height: 720 },
      locale: "en-US",
      timezoneId: "Asia/Kolkata",
    });

    // Block unnecessary resources to improve performance
    await context.route(
      "**/*.{png,jpg,jpeg,svg,gif,webp,woff,woff2}",
      (route) => route.abort()
    );
    await context.route("**/*.css", (route) => route.abort());

    const page = await context.newPage();

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      Referer: "https://www.google.com/",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "cross-site",
      "Sec-Fetch-User": "?1",
    });
    await page.goto("https://www.iplt20.com/points-table/men", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
      referer: 'https://www.google.com/'
    });

    await page.screenshot({ path: "debug.png" });
    await page.waitForSelector("#pointtable", { timeout: 5000 });

    const standings = await page.$$eval("#pointsdata > tr", (rows) => {
      return rows.map((row) => {
        const columns = Array.from(row.querySelectorAll("td"));
        return {
          position: parseInt(columns[0]?.textContent?.trim() || "0"),
          team: columns[2]?.querySelector("h2")?.textContent?.trim() || "",
          matches: parseInt(columns[3]?.textContent?.trim() || "0"),
          wins: parseInt(columns[4]?.textContent?.trim() || "0"),
          losses: parseInt(columns[5]?.textContent?.trim() || "0"),
          points: parseInt(columns[10]?.textContent?.trim() || "0"),
          netRunRate: parseFloat(columns[7]?.textContent?.trim() || "0"),
        };
      });
    });

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json({ standings });
  } catch (error) {
    console.error("Standings scraping error:", error);
    res.status(500).json({
      error: "Failed to fetch standings",
      standings: [],
    });
  } finally {
    if (browser) await browser.close();
  }
}
