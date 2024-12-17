"use server";
import { mysql } from "@/lib";
import { CompanyDataTable } from "@/lib/db/schema/company-data.db.schema";
import {
  CompanyPaginatedResponse,
  CompanyWithIndustry,
  ProductPaginatedResponse,
  SearchCompanyOrProduct,
} from "./company.schema";
import { ProductTable } from "@/lib/db/schema/product.db.schema";
import { asc, count, eq, like } from "drizzle-orm";
import { Product, ProductData } from "../categorize/categorize-data.schema";

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

export async function getCompanies(
  page = 1,
  itemsPerPage = 8
): Promise<CompanyPaginatedResponse<CompanyWithIndustry>> {
  try {
    const offset = (page - 1) * itemsPerPage;

    const totalCompanies = await mysql.select().from(CompanyDataTable);
    const totalItems = Number(totalCompanies.length ?? 0);
    const companies = await mysql
      .select()
      .from(CompanyDataTable)
      .limit(itemsPerPage)
      .offset(offset)
      .orderBy(asc(CompanyDataTable.companyName));

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

    return {
      data: validatedData,
      totalItems,
    };
  } catch (error: any) {
    throw new Error(
      "Error retrieving data from the database: " + error.message
    );
  }
}

export async function searchCompanyOrProduct(
  keyword: string,
  page: number = 1,
  itemsPerPage: number
): Promise<CompanyPaginatedResponse<SearchCompanyOrProduct>> {
  try {
    const companies = await mysql
      .select()
      .from(CompanyDataTable)
      .where(like(CompanyDataTable.companyName, `%${keyword}%`))
      .orderBy(asc(CompanyDataTable.companyName));

    const companiesFullDatas: CompanyWithIndustry[] = await Promise.all(
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

    const products: Product[] = Object.values(
      await mysql
        .select()
        .from(ProductTable)
        .where(like(ProductTable.productServiceName, `%${keyword}%`))
        .orderBy(asc(ProductTable.productServiceName))
    ).map((product) => ({
      ...product,
      dateOfCertification: product.dateOfCertification
        ? product.dateOfCertification.toISOString()
        : null,
      validity: product.validity ? product.validity.toISOString() : null,
    }));

    const allDatas: SearchCompanyOrProduct[] = [
      ...companiesFullDatas.map((company) => ({
        company: company,
        product: null,
      })),
      ...products.map((product) => ({
        company: null,
        product: product,
      })),
    ];

    const sortedData: SearchCompanyOrProduct[] = allDatas.sort((a, b) => {
      const nameA = a.company
        ? a.company.companyName
        : a.product?.productServiceName;
      const nameB = b.company
        ? b.company.companyName
        : b.product?.productServiceName;
      return (nameA || "").localeCompare(nameB || "");
    });

    const totalItems = sortedData.length;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedData: SearchCompanyOrProduct[] = sortedData.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    console.log("totalItems", totalItems);
    console.log("itemsPerPage", itemsPerPage);
    console.log("totalPages", totalPages);

    return {
      data: paginatedData,
      totalItems,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error in searchCompanyOrProduct:", error);
    throw error;
  }
}

export async function getCompanyById(
  id: number
): Promise<CompanyWithIndustry | null> {
  let companyInfo: CompanyWithIndustry | null;
  try {
    const companies = await mysql
      .select()
      .from(CompanyDataTable)
      .where(eq(CompanyDataTable.id, id))
      .limit(1);

    if (companies.length > 0) {
      const industryPromises = companies.map(async (company) => {
        try {
          const industries = await mysql
            .selectDistinct({ industry: ProductTable.industry ?? "" })
            .from(ProductTable)
            .where(eq(ProductTable.companyId, company.id));

          const industryArray: string[] | null =
            industries.length > 0
              ? industries.map((industry) => industry.industry ?? "")
              : null;

          return {
            ...company,
            industry: industryArray ?? null,
          };
        } catch (innerError: any) {
          console.error("Error fetching industry", innerError.message);
          throw innerError;
        }
      });

      const results = await Promise.all(industryPromises);
      companyInfo =
        results.length > 0 ? (results[0] as CompanyWithIndustry) : null;
    }
  } catch (error) {
    console.error("Error not found", error);
    throw error;
  }
  return companyInfo!;
}

export async function getProductsByCompanyId(
  companyId: number,
  page: number = 1,
  itemsPerPage: number
): Promise<ProductPaginatedResponse<ProductData[]>> {
  try {
    const offset = (page - 1) * itemsPerPage;

    const totalProduct = await mysql
      .select()
      .from(ProductTable)
      .where(eq(ProductTable.companyId, companyId));
    const totalItems = totalProduct.length ?? 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const products = await mysql
      .select()
      .from(ProductTable)
      .limit(itemsPerPage)
      .where(eq(ProductTable.companyId, companyId))
      .offset(offset)
      .orderBy(asc(ProductTable.productServiceName));

    const transformedProducts: ProductData[] = products.map((product) => ({
      id: product.id,
      productServiceName: product.productServiceName ?? null,
      productServiceDescription: product.productServiceDescription ?? null,
      industry: product.industry ?? null,
      certificationType: product.certificationType ?? null,
      score: product.score ?? null,
      carbonFootprint: product.carbonFootprint ?? null,
      environmentDescription: product.environmentDescription ?? null,
      productImageUrl: product.productImageUrl ?? null,
      companyId: product.companyId ?? null,
      dateOfCertification: product.dateOfCertification
        ? new Date(product.dateOfCertification).toISOString()
        : null,
      validity: product.validity
        ? new Date(product.validity).toISOString()
        : null,
    }));

    return {
      data: transformedProducts as ProductData[],
      totalItems,
      totalPages,
      currentPage: page,
    };
  } catch (error: any) {
    throw new Error(
      "Error retrieving data from the database: " + error.message
    );
  }
}
