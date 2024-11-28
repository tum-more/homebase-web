import {
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const CompanyDataTable = mysqlTable("company_data_table", {
  id: int("id").primaryKey().autoincrement(),
  companyName: varchar("company_name", { length: 255 }),
  industry: varchar("industry", { length: 255 }),
  location: varchar("location", { length: 255 }),
  website: varchar("website", { length: 255 }),
  relatedCompanies: text("related_companies"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }),
});