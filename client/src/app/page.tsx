"use client";

import { getUsers } from "@/lib/api/users";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ul className="list-disc list-inside">
        {data?.map((user) => (
          <li key={user.id} className="text-white">
            <h2 className="font-bold">Title: {user.email}</h2>
            <p className="text-sm text-gray-600">{user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
