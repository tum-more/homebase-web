"use server";

import { mysql } from "@/lib";
import { BCorpRawDataTable } from "@/lib/db/schema";
import axios from "axios";
import { load } from "cheerio";
import https from "https";
import puppeteer from 'puppeteer';

const agent = new https.Agent({ rejectUnauthorized: false });
const BASE_URL = "https://www.bcorporation.net/en-us/find-a-b-corp/?page=";
const INI_URL = "https://www.bcorporation.net";

export async function fetchBCorpRawData(page: number) {
  const results: any[] = [];

  const browser = await puppeteer.launch();
  try {
    const mainPage = await browser.newPage();
    await mainPage.goto(`${BASE_URL}${page}`, { waitUntil: 'networkidle2' }); // waits until there are no active network connections for at least 500 ms.
    const isSelectorPresent = await mainPage.waitForSelector('.ais-Hits-item', { timeout: 5000}).catch(() => null);

    if (!isSelectorPresent) {
      console.log(`No more data found on page ${page}. Ending fetch.`);
      return results;
    }

    const items = await mainPage.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.ais-Hits-item'));
      return items.map(item => {
        const companyImage = item.querySelector("img")?.getAttribute("src") || "N/A";
        const companyName = item.querySelector("span")?.innerText.trim() || "N/A";
        const companyLink = item.querySelector("a")?.getAttribute("href") || "N/A";

        return {
          companyImage,
          companyName,
          companyLink,
        };
      });
    });

    for (const item of items) {
      const additionalData = item.companyLink !== "N/A"
        ? await fetchAdditionalData(item.companyLink)
        : null;

        results.push({
          companyImage: item.companyImage,
          companyName: item.companyName,
          companyLink: INI_URL + item.companyLink,
          additionalData,
        });
    }

    return results;

  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw new Error("Failed to fetch data");
  } finally {
    await browser.close();
  }
}

const fetchAdditionalData = async (dataLoadUrl: string) => {
  try {
    const { data: additionalData } = await axios.get(`${INI_URL}${dataLoadUrl}`, {
      httpsAgent: agent,
    });
    const $additional = load(additionalData);
    const location = Array.from(
      new Set(
        $additional("span:contains('Headquarters')")
          .next(".opacity-60")
          .find("p")
          .map((_, el) => $additional(el).text().trim())
          .get()
      )
    ).join(", ") || "N/A";

    const certifiedSince = $additional("span:contains('Certified Since')")
      .next(".opacity-60")
      .find("p span.font-serif")
      .first()
      .text()
      .trim() || "N/A";

    const industry = $additional("span:contains('Industry')")
      .next(".opacity-60")
      .find("p")
      .text()
      .trim() || "N/A";

    const website = $additional("span:contains('Website')")
      .next(".opacity-60")
      .find("a")
      .attr("href") || "N/A";

    const description = $additional("p.my-8").text().trim() || "N/A";

    return{
      location,
      certifiedSince,
      industry,
      website,
      description
    };
  } catch (error: any) {
    console.error("Error fetching additional data:", error.message);
    return;
  }
};

export async function addBCorpRawData(results: any[]) {
  try {
    const values = results.map((result) => ({
      companyName: result.companyName,
      location: result.additionalData.location,
      industry: result.additionalData.industry,
      website: result.additionalData.website,
      dateOfCertification: result.additionalData.certifiedSince,
      companyDescription: result.additionalData.description,
    }));
    await mysql.insert(BCorpRawDataTable).values(values);
  } catch (error: any) {
    throw new Error("Error adding data to the database: " + error.message);
  }
}

export async function deleteAllBCorpRawData() {
  try {
    await mysql.delete(BCorpRawDataTable);
  } catch (error: any) {
    throw new Error("Error adding data to the database: " + error.message);
  }
}
