import Logo from "@/components/Logo";
import LoginForm from "./components/LoginForm";

export const metadata = { title: "Log In" };

function Login() {
  return (
    <div
      className="
        min-h-screen
        grid grid-cols-[20rem] md:grid-cols-[36rem]
        place-content-center
        bg-[var(--color-grey-50)]/20 backdrop-blur-md text-[var(--color-grey-700)] 
        gap-8
      "
    >
      <Logo size="lg" />
      <LoginForm />
    </div>
  );
}

export default Login;
