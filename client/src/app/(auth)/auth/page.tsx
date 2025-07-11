"use client";

import { connectSocket } from "@/contexts/SocketContext";
import { USER_QUERY_KEY } from "@/lib/utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Auth() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const encodedData = searchParams.get("data");
    if (encodedData) {
      try {
        const decodedData = JSON.parse(atob(encodedData));
        const { status, provider, user, accessToken, refreshToken } =
          decodedData;

        queryClient.setQueryData([USER_QUERY_KEY], user);

        // Store tokens in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        connectSocket();

        toast.success(
          `Successfully logged in ${provider ? `with ${provider}` : ""}`
        );
        setTimeout(() => {
          router.push("/home");
        }, 300);
      } catch {
        toast.error("Authentication failed");
        router.replace("/login");
      }
    }
  }, [router, searchParams, queryClient]);
}

export default Auth;
