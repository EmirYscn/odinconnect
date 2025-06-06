import axios from "axios";
import { env } from "../env";

const API_BASE_URL = env.apiUrl;

// Create axios instance with base URL
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
