import {
  date,
  double,
  int,
  mysqlTable,
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import { CompanyDataTable } from "./company-data.db.schema";

export const ProductTable = mysqlTable("product_table", {
  id: int("id").primaryKey().autoincrement(),
  productServiceName: varchar("product_service_name", { length: 255 }),
  productServiceDescription: text("product_service_description"),
  industry: varchar("industry", { length: 255 }),
  certificationType: varchar("certification_type", { length: 100 }),
  dateOfCertification: date("date_of_certification"),
  validity: date("validity"),
  score: double("score"),
  carbonFootprint: varchar("carbon_footprint", { length: 255 }),
  environmentDescription: text("environment_description"),
  productImageUrl: varchar("product_image_url", { length: 255 }),
  companyId: int("company_id")
    .notNull()
    .references(() => CompanyDataTable.id),
});
