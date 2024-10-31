import {
  date,
  double,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const GreensealRawDataTable = mysqlTable("greenseal_raw_data_table", {
  id: int("id").primaryKey().autoincrement(),
  companyName: varchar("company_name", { length: 255 }),
  industry: varchar("industry", { length: 255 }),
  location: varchar("location", { length: 255 }),
  website: varchar("website", { length: 255 }),
  certificationType: varchar("certification_type", { length: 100 }),
  dateOfCertification: date("date_of_certification"),
  validity: date("validity"),
  score: double("score"),
  carbonFootprint: varchar("carbon_footprint", { length: 255 }),
  productServiceName: varchar("product_service_name", { length: 255 }),
  productServiceDescription: text("product_service_description"),
  environmentDescription: text("environment_description"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }),
});
