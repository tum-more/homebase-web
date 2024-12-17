import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  productServiceName: z.string().max(255).nullable(),
  productServiceDescription: z.string().nullable(),
  industry: z.string().max(255).nullable(),
  certificationType: z.string().max(100).nullable(),
  dateOfCertification: z
    .string()
    .nullable()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .optional(),
  validity: z
    .string()
    .nullable()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .optional(),
  score: z.number().nullable(),
  carbonFootprint: z.string().max(255).nullable(),
  environmentDescription: z.string().nullable(),
  productImageUrl: z.string().max(255).nullable(),
  companyId: z.number().nullable(),
});

export type Product = z.infer<typeof ProductSchema>;

export type ProductData = Product;
