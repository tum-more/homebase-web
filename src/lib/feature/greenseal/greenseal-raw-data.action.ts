"use server";

import { mysql } from "@/lib";
import { GreensealRawDataTable } from "@/lib/db/schema/greenseal-raw-data.db.schema";
import axios from "axios";
import { load } from "cheerio";
import https from "https";

const agent = new https.Agent({ rejectUnauthorized: false });
const BASE_URL = "https://certified.greenseal.org/companies";

export async function getGreensealProductDetail(url: string) {
  let companyName: string = "";
  let certificateType: string = "";
  let yearOfCertification: string = "";

  try {
    const { data } = await axios.get(url, {
      httpsAgent: agent,
    });
    const $ = load(data);

    const productName = $(".jumbotron p").first().text().trim();
    const productServiceDescription = $(".jumbotron img")
      .next("p")
      .text()
      .trim();

    $("div").each((index, element) => {
      const companyDiv = $(element).find('div:contains("Company:") a');
      if (companyDiv.length > 0) {
        companyName = companyDiv.text().trim();
      }
      const StandardDiv = $(element).find('div:contains("Standard:") a');
      if (StandardDiv.length > 0) {
        certificateType = StandardDiv.text().trim();
      }

      const certifiedSinceDiv = $(element).find(
        'div:contains("Certified Since:")'
      );
      if (certifiedSinceDiv.length > 0) {
        yearOfCertification = certifiedSinceDiv
          .text()
          .replace("Certified Since: ", "")
          .trim();
      }
    });

    return {
      companyName,
      productName,
      yearOfCertification,
      certificateType,
      url,
      productServiceDescription,
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw new Error("Failed to fetch data");
  }
}

// export const fetchInnerItems = async (url: string) => {
//   const innerResults: any[] = [];
//   try {
//     const { data: items } = await axios.get(url, {
//       httpsAgent: agent,
//     });
//     const $ = load(items);

//     const innerPromises = $(".data-item-container .row .flex-col")
//       .map((_index, element) => {
//         const productDetailUrl = $(element).find("a").attr("href");
//         if (productDetailUrl == null) return;

//         return (async () => {
//           try {
//             const productDetail = await getGreensealProductDetail(
//               productDetailUrl
//             );
//             const innerDetail = {
//               productDetailUrl,
//               productDetail,
//             };

//             innerResults.push(innerDetail);
//           } catch (innerError: any) {
//             console.error(
//               `Error fetching details for ${productDetailUrl}:`,
//               innerError.message
//             );
//           }
//         })();
//       })
//       .get();

//     await Promise.all(innerPromises);

//     return innerResults;
//   } catch (error: any) {
//     if (error.response && error.response.status === 502) {
//       console.error("502 Bad Gateway Error for URL:", url);
//     } else {
//       console.error("Error fetching additional data:", error.message);
//     }
//     return innerResults;
//   }
// };
export const fetchInnerItems = async (url: string) => {
  const innerResults: any[] = [];
  let currentUrl: string | null = url; // ใช้ currentUrl เพื่อจัดการกับการทำ pagination

  while (currentUrl) {
    try {
      const { data: items } = await axios.get(currentUrl, {
        httpsAgent: agent,
      });
      const $ = load(items);

      const innerPromises = $(".data-item-container .row .flex-col")
        .map((_index, element) => {
          const productDetailUrl = $(element).find("a").attr("href");
          if (productDetailUrl == null) return;

          return (async () => {
            try {
              const productDetail = await getGreensealProductDetail(
                productDetailUrl
              );
              const innerDetail = {
                productDetailUrl,
                productDetail,
              };

              innerResults.push(innerDetail);
            } catch (innerError: any) {
              console.error(
                `Error fetching details for ${productDetailUrl}:`,
                innerError.message
              );
            }
          })();
        })
        .get();

      await Promise.all(innerPromises);

      const nextPageLink = $("div.pagination:first a").last().attr("href");

      const isNextDisabled =
        $("div.pagination:first a").last().css("pointer-events") === "none";

      if (nextPageLink && !isNextDisabled) {
        currentUrl = nextPageLink;
      } else {
        currentUrl = null;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 502) {
        console.error("502 Bad Gateway Error for URL:", currentUrl);
      } else {
        console.error("Error fetching additional data:", error.message);
      }
      break;
    }
  }

  return innerResults;
};

export async function fetchGreensealRawData() {
  const results: any[] = [];

  try {
    const { data } = await axios.get(BASE_URL, {
      httpsAgent: agent,
    });
    const $ = load(data);
    const promises = $(".data-item-container .row .flex-col")
      .map((_index, element) => {
        const mainUrl = $(element).find("a").attr("href");

        return (async () => {
          const items = mainUrl ? await fetchInnerItems(mainUrl) : null;
          results.push({ mainUrl, items });
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

export async function addGreensealRawData(items: any[]) {
  try {
    const values = items.map((item) => ({
      productName: item.productDetail.productName,
      companyName: item.productDetail.companyName,
      productServiceDescription: item.productDetail.productServiceDescription,
      yearOfCertification: item.productDetail.yearOfCertification,
      certificateType: item.productDetail.certificateType,
      referenceURL: item.productDetail.url,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await mysql.insert(GreensealRawDataTable).values(values);
  } catch (error: any) {
    throw new Error("Error adding data to the database: " + error.message);
  }
}

export async function deleteAllGreensealRawData() {
  try {
    await mysql.delete(GreensealRawDataTable);
  } catch (error: any) {
    throw new Error("Error adding data to the database: " + error.message);
  }
}
