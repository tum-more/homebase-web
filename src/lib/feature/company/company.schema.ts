import { z } from "zod";

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
