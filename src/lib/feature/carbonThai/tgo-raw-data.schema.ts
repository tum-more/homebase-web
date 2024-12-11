import { z } from "zod";

export const TGORawDataTableSchema = z.object({
  id: z.number(),
  companyName: z.string().max(255).optional(),
  industry: z.string().max(255).optional(),
  location: z.string().max(255).optional(),
  website: z.string().max(255).optional(),
  certificationType: z.string().max(100).optional(),
  dateOfCertification: z.date().nullable().optional(),
  validity: z.date().nullable().optional(),
  score: z.number().nullable().optional(), // Allow score to be nullable
  carbonFootprint: z.string().max(255).optional(),
  productServiceName: z.string().max(255).optional(),
  productServiceDescription: z.string().nullable().optional(),
  environmentDescription: z.string().nullable().optional(),
  productImageUrl: z.string().max(255).optional(),
  companyId: z.number().nullable().optional(), // Allow companyId to be nullable
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
});

export type TGORawDataTableType = z.infer<typeof TGORawDataTableSchema>;
