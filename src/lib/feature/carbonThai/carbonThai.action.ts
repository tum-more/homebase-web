"use server";

import { mysql } from "@/lib";
import { thaiCarbonTable } from "@/lib/db/schema";
import axios from "axios";
import { load } from "cheerio";
import https from "https";

const agent = new https.Agent({ rejectUnauthorized: false });
const BASE_URL =
  "https://thaicarbonlabel.tgo.or.th/index.php?lang=TH&mod=Y0hKdlpIVmpkSE5mWVhCd2NtOTJZV3c9&page=";

export async function fetchThaiCarbon(page: number) {
  const results: any[] = [];

  try {
    const { data } = await axios.get(`${BASE_URL}${page}`, {
      httpsAgent: agent,
    });
    const $ = load(data);

    $(".approval-text").each((index, element) => {
      const productImage = $(element).find("img").attr("src");
      const productCode = $(element).find("h4").text().trim();
      const productName = $(element).find("h3").text().trim();
      const companyName = $(element).find(".approval-company").text().trim();
      const carbonInfo = $(element)
        .next(".span2")
        .find(".approval-info")
        .text()
        .trim();

      results.push({
        productImage,
        productCode,
        productName,
        companyName,
        carbonInfo,
      });
    });

    return results;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw new Error("Failed to fetch data");
  }
}

export async function addCarbonThaiData(results: any[]) {
  try {
    await deleteAllCarbonData();
    const values = results.map((result) => ({
      productImage: result.productImage,
      productCode: result.productCode,
      productName: result.productName,
      companyName: result.companyName,
      carbonInfo: result.carbonInfo,
    }));
    await mysql.insert(thaiCarbonTable).values(values);
  } catch (error: any) {
    throw new Error("Error adding data to the database: " + error.message);
  }
}

async function deleteAllCarbonData() {
  try {
    await mysql.delete(thaiCarbonTable);
  } catch (error: any) {
    throw new Error("Error adding data to the database: " + error.message);
  }
}
