"use client";

import React, { useState, useEffect } from "react";
import {
  getTGOData,
  getGreensealData,
} from "@/lib/feature/categorize/categorize-data.action";

type Company = {
  id: string;
  companyName: string;
  source: string;
  groupId: string;
  selected?: boolean;
};

export default function CategorizeForm() {
  const [groupedCompanies, setGroupedCompanies] = useState<
    Record<string, Company[]>
  >({});
  const [selectedCompanies, setSelectedCompanies] = useState<
    Record<string, Company>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      const tgoData = await getTGOData();
      const greensealData = await getGreensealData();

      const combinedData: Company[] = [
        ...tgoData.map((item: any) => ({
          id: `tgo-${item.id}`,
          companyName: item.companyName,
          source: item.source,
          groupId: item.companyName.toLowerCase(),
        })),
        ...greensealData.map((item: any) => ({
          id: `greenseal-${item.id}`,
          companyName: item.companyName,
          companyDesc: `${item.companyName} ${item.source}`,
          source: item.source,
          groupId: item.companyName.toLowerCase(),
        })),
      ];

      // Group companies by name (groupId)
      const grouped = combinedData.reduce(
        (accummulatedGroups: Record<string, Company[]>, company) => {
          // ถ้าไม่มีกลุ่มใน accummulatedGroups ให้สร้างใหม่
          if (!accummulatedGroups[company.groupId])
            accummulatedGroups[company.groupId] = [];
          accummulatedGroups[company.groupId].push(company);
          return accummulatedGroups;
        },
        {}
      );

      setGroupedCompanies(grouped);

      // Automatically select a company if all names in the group are the same
      const initialSelected = Object.fromEntries(
        Object.entries(grouped)
          .filter(([, companies]) =>
            companies.every((c) => c.companyName === companies[0].companyName)
          )
          .map(([groupId, companies]) => [
            groupId,
            { ...companies[0], selected: true },
          ])
      );

      setSelectedCompanies(initialSelected);
    };

    fetchData();
  }, []);

  const handleSelect = (groupId: string, selectedId: string) => {
    setSelectedCompanies((prev: any) => ({
      ...prev,
      [groupId]: groupedCompanies[groupId].find(
        (company) => company.id === selectedId
      ),
    }));
  };

  const handleSave = () => {
    // Create an array of companies to save
    const companiesToSave = Object.entries(selectedCompanies).map(
      ([groupId, selectedCompany]) => {
        const group = groupedCompanies[groupId];

        // Add relatedCompanies if the group has different names
        const relatedCompanies = group.every(
          (c) => c.companyName === group[0].companyName
        ) // Check if all names are the same
          ? undefined
          : group
              .filter((company) => company.id !== selectedCompany?.id) // Exclude the selected company
              .map((company) => company.companyName)
              .join(", ");

        return {
          companyName: selectedCompany?.companyName,
          ...(relatedCompanies ? { relatedCompanies } : {}), // Add relatedCompanies only if it exists
        };
      }
    );

    console.log("Companies to save:", companiesToSave);
    alert("Data saved successfully!");

    // TODO: Save the company data to the database
  };

  const isSaveDisabled =
    Object.keys(groupedCompanies).length !==
    Object.keys(selectedCompanies).length;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {Object.entries(groupedCompanies).map(([groupId, companies]) => (
        <div key={groupId} style={{ marginBottom: "20px" }}>
          <h2>Group: {groupId}</h2>
          <ul>
            {companies.map((company) => (
              <li key={company.id}>
                <label>
                  <input
                    type="radio"
                    name={`group-${groupId}`}
                    checked={selectedCompanies[groupId]?.id === company.id}
                    onChange={() => handleSelect(groupId, company.id)}
                  />
                  {`${company.companyName} (${company.source})`}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button
        onClick={handleSave}
        disabled={isSaveDisabled}
        style={{
          padding: "10px 20px",
          backgroundColor: isSaveDisabled ? "grey" : "blue",
          color: "white",
          cursor: isSaveDisabled ? "not-allowed" : "pointer",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Save
      </button>
    </div>
  );
}
