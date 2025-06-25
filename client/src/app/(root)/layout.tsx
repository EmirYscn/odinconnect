import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MiscSidebar from "@/components/MiscSidebar";

import AuthGuard from "@/components/AuthGuard";

export default async function RootNestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthGuard>
        <div className="flex flex-col-reverse md:grid md:grid-cols-[auto_1fr] xl:grid-cols-[auto_1fr_25rem] bg-[var(--color-grey-50)]/40 backdrop-blur-md h-screen">
          <aside className="">
            <Sidebar />
          </aside>
          <div className="flex-1 overflow-auto">{children}</div>
          <div className="block md:hidden">
            <Header />
          </div>
          <div className="hidden xl:block">
            <MiscSidebar />
          </div>
        </div>
      </AuthGuard>
    </>
  );
}
