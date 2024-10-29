import { int, mysqlTable, text } from "drizzle-orm/mysql-core";

export const carbonThaiTable = mysqlTable("carbon_thai", {
  id: int("id").primaryKey().autoincrement(),
  certificateNumber: text("certificate_number"),
  productName: text("product_name"),
  manufacturer: text("manufacturer"),
  contactPerson: text("contact_person"),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  industry: text("industry"),
  unitOfWork: text("unit_of_work"),
  scope: text("scope"),
  carbonFootprint: text("carbon_footprint"),
  approvalDate: text("approval_date"),
  expiryDate: text("expiry_date"),
  productImage: text("product_image")
});
