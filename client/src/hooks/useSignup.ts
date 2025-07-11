import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const router = useRouter();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      router.replace("/login");
      toast.success("Account successfully created!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isPending };
};

export default useSignup;
