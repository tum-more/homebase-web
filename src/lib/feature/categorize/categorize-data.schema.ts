import { z } from "zod";

export const CompanyDataSchema = z.object({
  id: z.number().optional(),
  companyName: z.string().max(255),
  location: z.string().max(255),
  website: z.string().max(255),
  relatedCompanies: z.string(),
  createdAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).optional(),
  updatedAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).optional(),
});

export type CompanyData = z.infer<typeof CompanyDataSchema>;

export const ProductSchema = z.object({
  id: z.number(),
  productServiceName: z.string().max(255),
  productServiceDescription: z.string(),
  industry: z.string().max(255),
  certificationType: z.string().max(100),
  dateOfCertification: z.string().nullable().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).optional(),
  validity: z.string().nullable().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).optional(),
  score: z.number(),
  carbonFootprint: z.string().max(255),
  environmentDescription: z.string(),
  productImageUrl: z.string().max(255),
  companyId: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;


