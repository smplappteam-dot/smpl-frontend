import { apiFetch } from "@/lib/api/client";
import { Statistics } from "../types/statistics.types";

export const getStatistics = async (): Promise<Statistics> => {
  return await apiFetch("admin/users/statistics");
};
