"use server";
import { mysql } from "@/lib";
import { TGORawDataTable } from "@/lib/db/schema";
import { GreensealRawDataTable } from "@/lib/db/schema/greenseal-raw-data.db.schema";

export async function getTGOData() {
  const result = await mysql.select().from(TGORawDataTable);
  return result.map((item) => ({ ...item, source: "TGO" }));
}

export async function getGreensealData() {
  const result = await mysql.select().from(GreensealRawDataTable);
  return result.map((item) => ({ ...item, source: "Greenseal" }));
}
