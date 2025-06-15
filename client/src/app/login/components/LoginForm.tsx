"use client";

// import GoogleButton from "./GoogleButton";
// import GitHubButton from "./GithubButton";
// import FormRowVertical from "./FormRowVertical";
// import Input from "./Input";
// import Button from "./Button";
// import { FormEvent } from "../types/types";
import Link from "next/link";
import FormRowVertical from "@/components/FormRowVertical";
import Input from "@/components/Input";
import GoogleButton from "@/app/login/components/GoogleButton";
import GitHubButton from "@/app/login/components/GithubButton";
import Button from "@/components/Button";
// import { useTranslation } from "react-i18next";

function LoginForm() {
  // const { t } = useTranslation("auth");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const { login, isPending } = useLogin();
  // const { isDarkMode } = useDarkMode();

  // function handleSubmit(e: FormEvent) {
  //   e.preventDefault();
  //   if (!email || !password) return;
  //   login(
  //     { email, password },
  //     {
  //       onSettled: () => {
  //         setEmail("");
  //         setPassword("");
  //       },
  //     }
  //   );
  // }

  return (
    <form
    // onSubmit={handleSubmit}
    >
      <FormRowVertical label={"Email"}>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          // disabled={isPending}
        />
      </FormRowVertical>

      <FormRowVertical label={"Password"}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          // disabled={isPending}
        />
      </FormRowVertical>

      {/* <Link to="/forgotPassword">{t("forgotPassword")}</Link> */}

      <FormRowVertical>
        <GoogleButton />
        <GitHubButton />
      </FormRowVertical>

      <Link href="/signup">Don&apos;t have an account?</Link>
      <FormRowVertical>
        <Button
          type="submit"
          size="medium"
          variation="login"
          // className="px-5 py-2 rounded-lg  bg-[var(--color-grey-50)] text-[var(--color-grey-900)]"
        >
          {/* {!isPending ? (
            <span className="text-gray-200">{t("loginButton")}</span>
          ) : (
            <SpinnerMini />
          )} */}
          Login
        </Button>
      </FormRowVertical>
    </form>
  );
}

export default LoginForm;
