import { Response } from "@comic-app/types";

export const proxyImg = async (url: string) => {
  const apiHost = process.env.NEXT_PUBLIC_SERVER_API;
  url = `${apiHost}/comic/img-proxy?url=${url}`;
  const response = await fetch(url, { method: "GET" });
  return response;
};

export const customFetch = async <T>(
  url: string,
  options: RequestInit,
  params?: Record<string, any>,
) => {
  const apiHost = process.env.NEXT_PUBLIC_SERVER_API;

  if (options.method === "GET" && params) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      searchParams.append(key, params[key].toString());
    }
    url = `${url}?${searchParams.toString()}`;
  }
  url = `${apiHost}${url}`;
  console.log("url", url);
  const response = await fetch(url, options);
  console.log("response", response);
  if (!response.ok || response.status !== 200) {
    throw new Error("Fetch failed");
  }
  const res: Response<T> = await response.json();
  console.log("res;", res);
  const { data, message, code } = res;
  if (code !== 200) {
    throw new Error(message);
  }

  return data;
};
