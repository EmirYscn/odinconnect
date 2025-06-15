import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const {} = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.json();
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};
