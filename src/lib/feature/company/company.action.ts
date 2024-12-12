"use server";
import { mysql } from "@/lib";
import { CompanyDataTable } from "@/lib/db/schema/company-data.db.schema";
import { CompanyWithIndustry } from "./company.schema";
import { ProductTable } from "@/lib/db/schema/product.db.schema";
import { asc, count, eq } from "drizzle-orm";

export async function getCompanyTotalPagination(
  itemsPerPage = 8
): Promise<number> {
  try {
    const totalRows = await mysql
      .select({ total: count() })
      .from(CompanyDataTable);

    const totalItems = totalRows[0]?.total ?? 0;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return totalPages;
  } catch (error: any) {
    throw new Error("Error calculating total pagination: " + error.message);
  }
}

export async function getCompanies(page = 1, itemsPerPage = 8): Promise<CompanyWithIndustry[]> {
    try {
      const offset = (page - 1) * itemsPerPage;
  
      const companies = await mysql
        .select()
        .from(CompanyDataTable)
        .limit(itemsPerPage)
        .offset(offset).orderBy(asc(CompanyDataTable.companyName));
  
      const validatedData: CompanyWithIndustry[] = await Promise.all(
        companies.map(async (company) => {
          const industries = await mysql
            .selectDistinct({ industry: ProductTable.industry ?? "" })
            .from(ProductTable)
            .where(eq(ProductTable.companyId, company.id));
  
          const industryArray: string[] | null =
            industries.length > 0
              ? industries.map((industry) => industry.industry ?? "")
              : null;
  
          const companyWithIndustry = {
            ...company,
            industry: industryArray ?? null,
          };
          return companyWithIndustry as CompanyWithIndustry;
        })
      );
  
      return validatedData;
    } catch (error: any) {
      throw new Error(
        "Error retrieving data from the database: " + error.message
      );
    }
  }
  
