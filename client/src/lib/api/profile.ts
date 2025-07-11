import type { Profile } from "@shared/types/types";
import { api } from "./axios";

export const getProfile = async (id: string): Promise<Profile> => {
  try {
    const res = await api.get(`/profile/${id}`);
    return res.data;
  } catch {
    throw new Error("Failed to fetch profile");
  }
};
