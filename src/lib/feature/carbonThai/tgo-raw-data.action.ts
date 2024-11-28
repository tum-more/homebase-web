"use server";

import { mysql } from "@/lib";
import { TGORawDataTable } from "@/lib/db/schema";
import axios from "axios";
import { load } from "cheerio";
import https from "https";
import dayjs from "dayjs";
import { isDate, toDateFormat } from "@/share/helper.ts/formatter";

const agent = new https.Agent({ rejectUnauthorized: false });
const BASE_URL =
  "https://thaicarbonlabel.tgo.or.th/index.php?lang=TH&mod=Y0hKdlpIVmpkSE5mWVhCd2NtOTJZV3c9&page=";

const extractDate = (dateString: string): Date | null => {
  const [day, month, yearBE] = dateString.split("/");
  const year = parseInt(yearBE) - 543; // Convert Buddhist year to Gregorian year
  return dayjs(`${year}-${month}-${day}`).toDate(); // Create a Date object
};

export async function fetchTGORawData(page: number) {
  const results: any[] = [];

  try {
    const { data } = await axios.get(`${BASE_URL}${page}`, {
      httpsAgent: agent,
    });
    const $ = load(data);

    const fetchAdditionalData = async (dataLoadUrl: string) => {
      try {
        const { data: additionalData } = await axios.get(dataLoadUrl, {
          httpsAgent: agent,
        });
        const $additional = load(additionalData);

        const extractText = (label: string) => {
          const text = $additional(`li:contains(${label})`)
            .text()
            .replace(label, "")
            .trim();
          return text || "N/A";
        };

        const extractTextApproval = extractDate(extractText("วันที่อนุมัติ:"));
        const extractTextExpiry = extractDate(extractText("วันที่หมดอายุ:"));

        const approvalDate = isDate(extractTextApproval)
          ? toDateFormat(extractTextApproval, "YYYY-MM-DD")
          : null;

        const expiryDate = isDate(extractTextExpiry)
          ? toDateFormat(extractTextExpiry, "YYYY-MM-DD")
          : null;

        return {
          companyName: extractText("ผู้ผลิต:"),
          location: extractText("ที่อยู่:"),
          industry: extractText("อุตสาหกรรม:"),
          carbonFootprint: extractText("ปริมาณ CF:"),
          dateOfCertification: approvalDate,
          validity: expiryDate,
        };
      } catch (error: any) {
        console.error("Error fetching additional data:", error.message);
        return {
          companyName: "N/A",
          location: "N/A",
          industry: "N/A",
          carbonFootprint: "N/A",
          dateOfCertification: null,
          validity: null,
        };
      }
    };

    const promises = $(".approval-text")
      .map((index, element) => {
        const productImage = $(element).find("img").attr("src");
        const productName = $(element).find("h3").text().trim();
        const dataLoadUrl =
          $(element)
            .closest(".row-fluid")
            .find(".approval-btn a")
            .attr("data-load") || "";

        return (async () => {
          const additionalInfo = dataLoadUrl
            ? await fetchAdditionalData(dataLoadUrl)
            : null;

          results.push({
            productImage,
            productName,
            additionalInfo,
          });
        })();
      })
      .get();

    await Promise.all(promises);

    return results;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw new Error("Failed to fetch data");
  }
}

export async function addTGORawData(results: any[]) {
  try {
    const values = results.map((result) => ({
      productServiceName: result.productName,
      companyName: result.additionalInfo.companyName,
      location: result.additionalInfo.location,
      industry: result.additionalInfo.industry,
      carbonFootprint: result.additionalInfo.carbonFootprint,
      dateOfCertification: result.additionalInfo.dateOfCertification,
      validity: result.additionalInfo.validity,
      productImageUrl: result.productImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await mysql.insert(TGORawDataTable).values(values);
  } catch (error: any) {
    throw new Error("Error adding data to the database: " + error.message);
  }
}

export async function deleteAllTGORawData() {
  try {
    await mysql.delete(TGORawDataTable);
  } catch (error: any) {
    throw new Error("Error adding data to the database: " + error.message);
  }
}
