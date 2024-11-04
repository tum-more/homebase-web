import {
    date,
    int,
    mysqlTable,
    text,
    timestamp,
    varchar,
  } from "drizzle-orm/mysql-core";
  
  export const BCorpRawDataTable = mysqlTable("bcorp_raw_data_table", {
    id: int("id").primaryKey().autoincrement(),
    companyName: varchar("company_name", { length: 255 }),
    industry: varchar("industry", { length: 255 }),
    location: varchar("location", { length: 255 }),
    website: varchar("website", { length: 255 }),
    dateOfCertification: date("date_of_certification"),
    referenceURL: varchar("reference_url", { length: 255 }),
    companyDescription: text("company_description"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }),
  });
  