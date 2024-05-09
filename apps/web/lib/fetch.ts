import { Response } from "@copymanga-app/types";

export const customFetch = async <T>(url: string, options: RequestInit) => {
  const apiHost = process.env.NEXT_PUBLIC_SERVER_API;
  const response = await fetch(`${apiHost}/${url}`, options);
  if (!response.ok || response.status !== 200) {
    throw new Error("Fetch failed");
  }
  const res: Response<T> = await response.json();

  const { data, message, code } = res;
  if (code !== "200") {
    throw new Error(message);
  }

  return data;
};
