"use client";

import React, { useState, useEffect } from "react";
import {
  addCompanyData,
  checkIfCompanyExists,
  deleteAllCompanyData,
  getTGOData,
  updateTGOData,
} from "@/lib/feature/categorize/categorize-data.action";
import { useLoading } from "@/share/providers/loadingContextProvider";
import stringSimilarity from "string-similarity";
import { deleteAllTGORawData } from "@/lib/feature/carbonThai/tgo-raw-data.action";
import { Company } from "@/share/models/company.model";
import { TGORawDataTableType } from "@/lib/feature/carbonThai/tgo-raw-data.schema";

interface CategorizeFormProps {
  onChecking: (noneChecked: boolean) => void;
  onCountsChange: (exactMatchCount: number, nonExactMatchCount: number) => void;
}

function trimCompanyName(companyName: string): string {
  return companyName;
}

export default function CategorizeForm({
  onChecking,
  onCountsChange,
}: CategorizeFormProps) {
  const [exactMatch, setExactMatch] = useState<number>(0);
  const [nonExactMatch, setNonExactMatch] = useState<number>(0);
  const [groupedCompanies, setGroupedCompanies] = useState<
    Record<string, Company[]>
  >({});
  const [hiddenGroups, setHiddenGroups] = useState<Record<string, Company[]>>(
    {}
  );
  const [selectedCompanies, setSelectedCompanies] = useState<
    Record<string, Company | null>
  >({});
  const [saving, setSaving] = useState(false);

  const { loading, setLoading, setError } = useLoading();

  const groupSimilarCompanies = (companies: Company[], threshold = 0.8) => {
    const groups: Record<string, Company[]> = {};

    companies.forEach((company) => {
      const trimmedName = trimCompanyName(company.companyName);

      let matchedGroup = null;

      for (const [groupId, groupCompanies] of Object.entries(groups)) {
        const similarity = stringSimilarity.compareTwoStrings(
          trimmedName.toLowerCase(),
          groupId.toLowerCase()
        );

        if (similarity >= threshold) {
          matchedGroup = groupId;
          break;
        }
      }

      if (matchedGroup) {
        groups[matchedGroup].push(company);
      } else {
        groups[trimmedName.toLowerCase()] = [company];
      }
    });

    for (const groupId of Object.keys(groups)) {
      const unique = new Map<string, Company>();
      groups[groupId].forEach((company) => {
        const trimmedName = trimCompanyName(company.companyName);
        unique.set(trimmedName.toLowerCase(), company);
      });
      groups[groupId] = Array.from(unique.values());
    }

    return groups;
  };

  useEffect(() => {
    onCountsChange(exactMatchCount, nonExactMatchCount);
  }, [exactMatch, nonExactMatch, onCountsChange]);

  const fetchData = async () => {
    // await deleteAllTGORawData();
    // await deleteAllCompanyData();
    setLoading(true);
    try {
      const tgoData: TGORawDataTableType[] = await getTGOData();

      const combinedData: Company[] = tgoData.map((item) => ({
        id: `tgo-${item.id}`,
        companyName: item.companyName ?? '',
        source: "tgo",
        groupId: item?.companyName?.toLowerCase() ?? '',
        location: item.location ?? '',
        website: item.website ?? '',
      }));

      const grouped = groupSimilarCompanies(combinedData, 0.8);

      const [exactMatches, nonExactMatches] = Object.entries(grouped).reduce(
        ([hidden, visible], [groupId, companies]) => {
          const allSameName = companies.every(
            (c) =>
              trimCompanyName(c.companyName) ===
              trimCompanyName(companies[0].companyName)
          );
          if (allSameName) {
            hidden[groupId] = companies;
          } else {
            visible[groupId] = companies;
          }
          return [hidden, visible];
        },
        [{}, {}] as [Record<string, Company[]>, Record<string, Company[]>]
      );

      setHiddenGroups(exactMatches);
      setGroupedCompanies(nonExactMatches);

      setExactMatch(Object.keys(exactMatches).length);
      setNonExactMatch(Object.keys(nonExactMatches).length);
      onChecking(false);

      const initialSelected = Object.fromEntries(
        Object.entries(exactMatches).map(([groupId, companies]) => [
          groupId,
          companies[0] || null, // เลือกแค่บริษัทแรกในกลุ่ม
        ])
      );

      setSelectedCompanies(initialSelected);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setLoading, setError]);

  const handleSelect = (groupId: string, companyId: string) => {
    setSelectedCompanies((prev) => {
      const selectedCompany = groupedCompanies[groupId]?.find(
        (company: Company) => company.id === companyId
      );
      return {
        ...prev,
        [groupId]: selectedCompany || null,
      };
    });
  };

  const handleDeactivated = (groupId: string, companyId: string) => {
    setGroupedCompanies((prevGroupedCompanies) => {
      const updatedCompanies = { ...prevGroupedCompanies };
      const companyIndex = updatedCompanies[groupId].findIndex(
        (company) => company.id === companyId
      );

      if (companyIndex !== -1) {
        updatedCompanies[groupId][companyIndex] = {
          ...updatedCompanies[groupId][companyIndex],
          deactivated: true,
        };
      }

      setSelectedCompanies((prevSelected) => {
        const updatedSelected = { ...prevSelected };
        if (updatedSelected[groupId]?.id === companyId) {
          updatedSelected[groupId] = null;
        }
        return updatedSelected;
      });

      return updatedCompanies;
    });
  };

  const handleUndeactivated = (groupId: string, companyId: string) => {
    setGroupedCompanies((prevGroupedCompanies) => {
      const updatedCompanies = { ...prevGroupedCompanies };
      const companyIndex = updatedCompanies[groupId].findIndex(
        (company) => company.id === companyId
      );

      if (companyIndex !== -1) {
        updatedCompanies[groupId][companyIndex] = {
          ...updatedCompanies[groupId][companyIndex],
          deactivated: false,
        };
      }

      setSelectedCompanies((prevSelected) => {
        const updatedSelected = { ...prevSelected };
        if (updatedSelected[groupId] === null) {
        }

        return updatedSelected;
      });

      return updatedCompanies;
    });
  };

  const handleSave = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to save the selected data?"
    );
    if (!confirmation) {
      console.log("User canceled the save action.");
      return;
    }

    setSaving(true);

    console.log("saving: ", saving);
    try {
      const companiesToInsert = Object.entries(groupedCompanies)
        .filter(([groupId]) => selectedCompanies[groupId])
        .map(([groupId, group]) => {
          const relatedCompanies = group
            .filter((company) => !company.deactivated)
            .map((company) => company.companyName)
            .join(" ||| ");

          return {
            companyName: trimCompanyName(group[0]?.companyName),
            location: group[0]?.location,
            website: group[0]?.website,
            relatedCompanies,
          };
        });

      const combinedData = [
        ...companiesToInsert,
        ...Object.entries(hiddenGroups).flatMap(([groupId, group]) =>
          group.map((record) => ({
            companyName: record.companyName,
            companyId: record.id.toString(),
            location: record.location,
            website: record.website,
            relatedCompanies: "",
          }))
        ),
      ];

      console.log("Combined Data for TGO update:", combinedData);

      const savedCompanies = [];
      for (const company of combinedData) {
        const exists = await checkIfCompanyExists(company.companyName);
        if (!exists) {
          const inserted = await addCompanyData([company]);
          savedCompanies.push({ ...company, id: inserted[0]?.id });
        }
      }

      console.log("Saved Companies:", savedCompanies);

      const finalData = [
        ...savedCompanies.map((company) => ({
          companyName: company.companyName,
          companyId: company.id.toString(),
          relatedCompanies: company.relatedCompanies,
        })),
      ];

      console.log("Final Data for TGO update:", finalData);

      for (const record of finalData) {
        await updateTGOData(
          record.companyName,
          record.companyId,
          record.relatedCompanies
        );
      }
      fetchData();
    } catch (error: any) {
      console.error("Error saving and updating data:", error);
      alert("Error: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const exactMatchCount = Object.keys(hiddenGroups).length;
  const nonExactMatchCount = Object.keys(groupedCompanies).length;

  return (
    <div className="p-6 pb-24 font-sans">
      {loading && (
        <div className="mt-4 flex flex-col items-center space-y-2">
          <div role="status" className="mt-4">
            <svg
              aria-hidden="true"
              className="w-8 h-8 animate-spin fill-blue-600 text-gray-200"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {Object.entries(groupedCompanies).map(([groupId, companies]) => (
        <div key={groupId} className="mb-4">
          <h2 className="font-bold mb-2">Group: {groupId}</h2>
          <ul className="list-none p-0">
            {companies.map((company) => (
              <li
                key={company.id}
                className={`mb-2 flex items-center ${
                  company.deactivated ? "bg-gray-300" : ""
                }`}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={groupId}
                    checked={selectedCompanies[groupId]?.id === company.id}
                    onChange={() => handleSelect(groupId, company.id)}
                    className="hidden"
                  />

                  <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-2 relative">
                    {selectedCompanies[groupId]?.id === company.id && (
                      <svg
                        className="w-3 h-3 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </span>
                  {`${trimCompanyName(company.companyName)} : ${
                    company.location
                  }`}

                  {company.deactivated ? (
                    <button
                      onClick={() => handleUndeactivated(groupId, company.id)}
                      className="ml-2 text-green-500 hover:text-green-700"
                    >
                      Undeactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeactivated(groupId, company.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Deactivate
                    </button>
                  )}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {(exactMatch > 0 || nonExactMatch > 0) && (
        <div className="fixed bottom-0 left-0 w-full bg-white-500 shadow-lg border-t border-gray-200 z-50 p-4 flex justify-center">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-500 hover:text-white-500"
            }`}
          >
            {loading ? "Loading..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}
