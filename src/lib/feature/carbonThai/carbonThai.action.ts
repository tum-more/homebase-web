"use server";

import { mysql } from "@/lib";
import { carbonThaiTable } from "@/lib/db/schema";
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

    const fetchAdditionalData = async (dataLoadUrl: string) => {
      try {
        const { data: additionalData } = await axios.get(dataLoadUrl, {
          httpsAgent: agent,
        });
        const $additional = load(additionalData);
    
        const extractText = (label: string) => {
          const text = $additional(`li:contains(${label})`).text().replace(label, '').trim();
          return text || "N/A";
        };
    
        const email = $additional("li:contains('อีเมล์:') a").text().trim();
    
        return {
          certificateNumber: extractText("เลขที่ใบรับรอง:"),
          manufacturer: extractText("ผู้ผลิต:"),
          contactPerson: extractText("บุคคลที่ติดต่อ:"),
          address: extractText("ที่อยู่:"),
          phone: extractText("โทรศัพท์:"),
          email: email || "N/A",
          industry: extractText("อุตสาหกรรม:"),
          unitOfWork: extractText("หน่วยการทำงาน:"),
          scope: extractText("ขอบเขต:"),
          carbonFootprint: extractText("ปริมาณ CF:"),
          approvalDate: extractText("วันที่อนุมัติ:"),
          expiryDate: extractText("วันที่หมดอายุ:"),
        };
      } catch (error: any) {
        console.error("Error fetching additional data:", error.message);
        return {
          certificateNumber: "N/A",
          manufacturer: "N/A",
          contactPerson: "N/A",
          address: "N/A",
          phone: "N/A",
          email: "N/A",
          industry: "N/A",
          unitOfWork: "N/A",
          scope: "N/A",
          carbonFootprint: "N/A",
          approvalDate: "N/A",
          expiryDate: "N/A",
        };
      }
    };

    const promises = $(".approval-text").map((index, element) => {
      const productImage = $(element).find("img").attr("src");
      const productName = $(element).find("h3").text().trim();
      const dataLoadUrl = $(element)
        .closest(".row-fluid")
        .find(".approval-btn a")
        .attr("data-load") || "";

      return (async () => {
        const additionalInfo = dataLoadUrl ? await fetchAdditionalData(dataLoadUrl) : null;

        results.push({
          productImage,
          productName,
          additionalInfo,
        });
      })();
    }).get();

    await Promise.all(promises);

    return results;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw new Error("Failed to fetch data");
  }
}

export async function addCarbonThaiData(results: any[]) {
  try {
    const values = results.map((result) => ({
      certificateNumber: result.additionalInfo.certificateNumber,
      productName: result.productName,
      manufacturer: result.additionalInfo.manufacturer,
      contactPerson: result.additionalInfo.contactPerson,
      address: result.additionalInfo.address,
      phone: result.additionalInfo.phone,
      email: result.additionalInfo.email,
      industry: result.additionalInfo.industry,
      unitOfWork: result.additionalInfo.unitOfWork,
      scope: result.additionalInfo.scope,
      carbonFootprint: result.additionalInfo.carbonFootprint,
      approvalDate: result.additionalInfo.approvalDate,
      expiryDate: result.additionalInfo.expiryDate,
      productImage: result.productImage,
    }));
    await mysql.insert(carbonThaiTable).values(values);
  } catch (error: any) {
    throw new Error("Error adding data to the database: " + error.message);
  }
}

export async function deleteAllCarbonData() {
  try {
    await mysql.delete(carbonThaiTable);
  } catch (error: any) {
    throw new Error("Error adding data to the database: " + error.message);
  }
}
