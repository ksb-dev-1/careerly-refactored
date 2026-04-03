"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Search } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function SearchInput() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);
    const currentSearch = params.get("search") || "";

    if (currentSearch === search.trim()) return;

    if (search.trim()) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full relative">
      <Input
        className="w-full px-2 sm:p-4 text-sm md:text-base"
        placeholder="Enter company, role or skill"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <Button
        onClick={handleSearch}
        className="bg-brand text-white dark:text-background hover:bg-brand-hover absolute top-0 right-0 h-[34.6px] px-3 flex items-center justify-center rounded-none rounded-tr-md rounded-br-md"
      >
        <Search size={18} />
      </Button>
    </div>
  );
}
