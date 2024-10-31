"use server";

import { mysql } from "@/lib";
import axios from "axios";
import { load } from "cheerio";
import https from "https";

const agent = new https.Agent({ rejectUnauthorized: false });
const BASE_URL = "https://certified.greenseal.org/companies";

export async function fetchGreensealRawData() {
  const results: any[] = [];

  try {
    const { data } = await axios.get(BASE_URL, {
      httpsAgent: agent,
    });
    const $ = load(data);

    const fetchAdditionalData = async (dataLoadUrl: string) => {
      const innerResults: any[] = [];
      try {
        const { data: additionalData } = await axios.get(dataLoadUrl, {
          httpsAgent: agent,
        });
        const $additional = load(additionalData);

        const innerPromises = $additional(".data-item-container .row .flex-col")
          .map((index, element) => {
            const innerUrl = $(element).find("a").attr("href");
            if (innerUrl == null) return;

            return (async () => {
              try {
                const { data: finalData } = await axios.get(innerUrl, {
                  httpsAgent: agent,
                });
                
                const detail$ = load(finalData);
                const company = detail$('div:contains("Company:") a')
                  .text()
                  .trim();
                const brand = detail$('div:contains("Brand:")')
                  .text()
                  .replace("Brand:", "")
                  .trim();
                const productName = detail$("h1").text().trim(); // Extracting the product name from an <h1> tag

                // Add more details here as needed
                const innerDetail = {
                  innerUrl,
                  company,
                  brand,
                  productName,
                };

                innerResults.push(innerDetail);
              } catch (innerError: any) {
                console.error(
                  `Error fetching details for ${innerUrl}:`,
                  innerError.message
                );
              }
            })();
          })
          .get();

        await Promise.all(innerPromises);

        return innerResults;
      } catch (error: any) {
        // Handling 502 and other errors
        if (error.response && error.response.status === 502) {
          console.error("502 Bad Gateway Error for URL:", dataLoadUrl);
        } else {
          console.error("Error fetching additional data:", error.message);
        }
        return innerResults; // Return what you can
      }
    };

    const promises = $(".data-item-container .row .flex-col")
      .map((index, element) => {
        const mainUrl = $(element).find("a").attr("href");

        return (async () => {
          console.log({ mainUrl });
          const additionalInfo = mainUrl
            ? await fetchAdditionalData(mainUrl)
            : null;

          results.push({ mainUrl, additionalInfo });
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

export async function addGreensealRawData(results: any[]) {
  try {
    const values = results.map((result) => ({
      productServiceName: result.productName,
      companyName: result.additionalInfo.companyName,
      location: result.additionalInfo.location,
      industry: result.additionalInfo.industry,
      carbonFootprint: result.additionalInfo.carbonFootprint,
      dateOfCertification: result.additionalInfo.dateOfCertification,
      validity: result.additionalInfo.validity,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    //await mysql.insert(TGORawDataTable).values(values);
  } catch (error: any) {
    throw new Error("Error adding data to the database: " + error.message);
  }
}

export async function deleteAllGreensealRawData() {
  try {
    //await mysql.delete(TGORawDataTable);
  } catch (error: any) {
    throw new Error("Error adding data to the database: " + error.message);
  }
}
