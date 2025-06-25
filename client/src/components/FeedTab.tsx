import { useState } from "react";

function FeedTab() {
  const [context, setContext] = useState<"foryou" | "following">("foryou");

  const handleTabClick = (tab: "foryou" | "following") => {
    setContext(tab);
  };

  return (
    <div className="flex justify-center w-full sticky top-0 z-10 cursor-pointer mb-3 shadow-md backdrop-blur-md rounded-xl">
      <div
        onClick={() => handleTabClick("foryou")}
        className={`text-center w-full py-4 px-6 border-b ${
          context === "foryou"
            ? "border-b-4 border-[var(--color-brand-100)]"
            : "border-gray-400/40"
        } hover:bg-[var(--color-brand-100)]/30 transition-all duration-300 ease-in-out rounded-bl-xl rounded-tl-xl`}
      >
        <span>For you</span>
      </div>
      <div
        onClick={() => handleTabClick("following")}
        className={`text-center w-full py-4 px-6 border-b ${
          context === "following"
            ? "border-b-4 border-[var(--color-brand-100)]"
            : "border-gray-400/40"
        } hover:bg-[var(--color-brand-100)]/30 transition-all duration-300 ease-in-out rounded-br-xl rounded-tr-xl`}
      >
        <span>Following</span>
      </div>
    </div>
  );
}

export default FeedTab;
