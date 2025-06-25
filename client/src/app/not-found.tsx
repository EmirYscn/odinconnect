"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 4000); // Redirect after 4 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-grey-50)]">
      <HiOutlineExclamationCircle className="w-20 h-20 text-blue-400 mb-6" />
      <h1 className="text-3xl font-bold mb-2 text-gray-700 bg-amber-200">
        Page Not Found
      </h1>
      <p className="text-gray-500 mb-6 text-center">
        Sorry, the page you are looking for does not exist.
        <br />
        Redirecting you to the home page...
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go to Home Now
      </Link>
    </div>
  );
}

export default NotFound;
