"use server";
import { mysql } from "@/lib";
import { eq, isNotNull, isNull } from "drizzle-orm";
import { TGORawDataTable } from "@/lib/db/schema";
import { CompanyDataTable } from "@/lib/db/schema/company-data.db.schema";
import { GreensealRawDataTable } from "@/lib/db/schema/greenseal-raw-data.db.schema";
import { ProductTable } from "@/lib/db/schema/product.db.schema";

export async function getTGOData() {
  const result = await mysql
    .select()
    .from(TGORawDataTable)
    .where(isNull(TGORawDataTable.companyId));
  return result.map((item) => ({ ...item, source: "TGO" }));
}

export async function getGreensealData() {
  const result = await mysql.select().from(GreensealRawDataTable);
  return result.map((item) => ({ ...item, source: "Greenseal" }));
}

export async function addCompanyData(results: any[]) {
  try {
    const values = results.map((result) => ({
      companyName: result.companyName,
      industry: result.industry,
      location: result.location,
      website: result.website,
      relatedCompanies: result.relatedCompanies,
    }));

    console.log({ values });

    const result = await mysql
      .insert(CompanyDataTable)
      .values(values)
      .$returningId();
    return result;
  } catch (error: any) {
    throw new Error("Error: " + error.message);
  }
}

export async function updateTGOData(
  companyName: string,
  companyId: string,
  relatedCompanies: string
) {
  try {
    // ลบ prefix เช่น "tgo-"
    console.log("numericCompanyId", companyId);
    const numericCompanyId = parseInt(companyId.replace(/^\D+/g, ""), 10);

    if (isNaN(numericCompanyId)) {
      throw new Error(`Invalid companyId: ${companyId}`);
    }

    await mysql
      .update(TGORawDataTable)
      .set({ companyId: numericCompanyId })
      .where(eq(TGORawDataTable.companyName, companyName));

    const relatedCompaniesArray = relatedCompanies.split(" ||| ");
    for (const relatedCompany of relatedCompaniesArray) {
      await mysql
        .update(TGORawDataTable)
        .set({ companyId: numericCompanyId })
        .where(eq(TGORawDataTable.companyName, relatedCompany.trim()));
    }

    console.log(`TGO data updated for ${companyName}`);
  } catch (error: any) {
    console.error("Error updating TGO data:", error);
    throw new Error("Error updating TGO data: " + error.message);
  }
}

export async function addProduct(records: any[], companyIds: string[]) {
  try {
    const productValues: any = records.map((record, index) => ({
      certificationType: record.certificationType,
      dateOfCertification: record.dateOfCertification,
      validity: record.validity,
      score: record.score,
      carbonFootprint: record.carbonFootprint,
      productServiceName: record.productServiceName,
      productServiceDescription: record.productServiceDescription,
      environmentDescription: record.environmentDescription,
      companyId: companyIds[index],
    }));

    await mysql.insert(ProductTable).values(productValues);
  } catch (error: any) {
    throw new Error(
      "Error occurred while adding product data: " + error.message
    );
  }
}

export async function deleteAllCompanyData() {
  try {
    await mysql.delete(CompanyDataTable);
  } catch (error: any) {
    throw new Error("Error adding data to the database: " + error.message);
  }
}

export const checkIfCompanyExists = async (
  companyName: string
): Promise<boolean> => {
  try {
    const company = await mysql
      .select()
      .from(CompanyDataTable)
      .where(eq(CompanyDataTable.companyName, companyName))
      .limit(1);

    return company.length > 0;
  } catch (error) {
    console.error("Error checking if company exists:", error);
    return false;
  }
};

export async function processTgoToProduct() {
  try {
    const tgoData = await mysql
      .select()
      .from(TGORawDataTable)
      .where(isNotNull(TGORawDataTable.companyId));

    for (const tgo of tgoData) {
      const {
        certificationType,
        dateOfCertification,
        validity,
        score,
        carbonFootprint,
        productServiceName,
        productServiceDescription,
        environmentDescription,
        companyId,
      } = tgo;

      if (companyId === null) {
        console.warn(`companyId is null, skipping this record.`);
        continue;
      }

      const companyExists = await mysql
        .select()
        .from(CompanyDataTable)
        .where(eq(CompanyDataTable.id, companyId))
        .limit(1);

      if (companyExists.length === 0) {
        console.warn(
          `No company found with ID ${companyId}. Skipping this record.`
        );
        continue;
      }

      const productValues: any = {
        certificationType,
        dateOfCertification,
        validity,
        score,
        carbonFootprint,
        productServiceName,
        productServiceDescription,
        environmentDescription,
        companyId,
      };

      console.log(`Inserting product for companyId: ${companyId}`);
      await mysql.insert(ProductTable).values(productValues);
    }
  } catch (error: any) {
    console.error("Error adding data to product table:", error);
    throw new Error("Error adding data to product table: " + error.message);
  }
}
