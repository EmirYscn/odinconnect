export const env = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ??
    (() => {
      throw new Error("Missing API URL");
    })(),
};
