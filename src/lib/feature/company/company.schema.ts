import { z } from "zod";
import { Product } from "../categorize/categorize-data.schema";

export const CompanyDataSchema = z.object({
  id: z.number().optional(),
  companyName: z.string().max(255),
  location: z.string().max(255),
  website: z.string().max(255),
  relatedCompanies: z.string(),
  createdAt: z
    .date()
    .refine((val) => !isNaN(val.getTime()), {
      message: "Invalid date format",
    })
    .optional(),
  updatedAt: z
    .date()
    .refine((val) => !isNaN(val.getTime()), {
      message: "Invalid date format",
    })
    .nullable(),
});

export type CompanyData = z.infer<typeof CompanyDataSchema>;

export interface CompanyWithIndustry extends CompanyData {
  industry: string[] | null;
}

export interface SearchCompanyOrProduct {
  company: CompanyWithIndustry | null;
  product: Product | null;
}

export interface CompanyPaginatedResponse<T> {
  data: T[];
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
}

export interface ResponseModel<T> {
  data?: T;
  error?: string;
}


export interface ProductPaginatedResponse<T> {
  data: T;
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
}
