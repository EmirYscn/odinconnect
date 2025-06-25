import Logo from "@/components/Logo";
import SignupForm from "./components/SignupForm";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export const metadata = { title: "Sign Up" };

function Signup() {
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
      <Link
        href="/login"
        className="text-2xl text-[var(--color-grey-500)] hover:text-[var(--color-brand-100)] transition-colors"
      >
        <IoArrowBack />
      </Link>
      <Logo size="lg" />
      <SignupForm />
    </div>
  );
}

export default Signup;
