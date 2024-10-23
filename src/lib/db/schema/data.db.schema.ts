import { int, mysqlTable, text } from "drizzle-orm/mysql-core";

export const thaiCarbonTable = mysqlTable("thai_carbon", {
  id: int("id").primaryKey().autoincrement(),
  productImage: text("product_image"),
  productCode: text("product_code"),
  productName: text("product_name"),
  companyName: text("company_name"),
  carbonInfo: text("carbon_info"),
});
