import Logo from "@/components/Logo";
import LoginForm from "./components/LoginForm";

function Login() {
  return (
    <div
      className="
        min-h-screen
        grid grid-cols-[20rem] md:grid-cols-[36rem]
        place-content-center
        bg-[var(--color-grey-50)] text-[var(--color-grey-700)] 
        gap-8
      "
    >
      <Logo size="lg" />
      <header className="text-3xl font-semibold text-center">Login</header>
      <LoginForm />
    </div>
  );
}

export default Login;
