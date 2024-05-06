"use server";
export async function getApiKey() {
  return process.env.API_KEY;
}

export async function getApiBaseUrl() {
  return process.env.API_BASE_URL;
}
