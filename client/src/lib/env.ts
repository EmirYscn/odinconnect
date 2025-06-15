export const env = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ??
    (() => {
      throw new Error("Missing API URL");
    })(),
  socketUrl:
    process.env.NEXT_PUBLIC_SOCKET_URL ??
    (() => {
      throw new Error("Missing Socket URL");
    })(),
};
