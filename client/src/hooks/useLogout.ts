import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout as logoutApi } from "@/lib/api/auth";

const USER_QUERY_KEY = "user";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.setQueryData([USER_QUERY_KEY], null);
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });

      router.replace("/login");
    },
  });
  return { logout, isPending };
}
