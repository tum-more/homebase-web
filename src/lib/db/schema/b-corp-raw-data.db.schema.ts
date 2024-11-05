import {
    int,
    mysqlTable,
    text,
    timestamp,
    varchar,
  } from "drizzle-orm/mysql-core";
  
  export const BCorpRawDataTable = mysqlTable("bcorp_raw_data_table", {
    id: int("id").primaryKey().autoincrement(),
    companyName: varchar("company_name", { length: 255 }), // Cameler Spice Co.
    industry: varchar("industry", { length: 255 }), // Food productsFood products
    location: varchar("location", { length: 255 }), // London Borough of Islington, United Kingdom
    website: varchar("website", { length: 255 }), // https://www.camelerspiceco.com
    certifiedSince: varchar("certified_since", { length: 255 }), // November 24
    referenceURL: varchar("reference_url", { length: 255 }), // https://www.bcorporation.net/en-us/find-a-b-corp/company/cameler-spice-co/
    companyDescription: text("company_description"), // Camelēr Spice Co. is a....
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }),
  });
  