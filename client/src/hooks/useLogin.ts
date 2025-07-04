import { login as loginApi } from "@/lib/api/auth";
import { USER_QUERY_KEY } from "@/lib/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: login, isPending } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => loginApi(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData([USER_QUERY_KEY], user);
      router.push("/home");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { login, isPending };
};
