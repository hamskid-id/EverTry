"use client";

import * as React from "react";
import { useRouter } from "nextjs-toploader/app";
import {  Search, X } from "lucide-react";
import { Brand } from "@/components/shared/Brand";
import CustomAvatar from "@/components/shared/CustomAvatar";

const AppHeader: React.FC = () => {
  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Focus input when search opens
  React.useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = () => {
    // Handle search logic here
    console.log("Search query:", searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <header className="w-full h-16 md:h-18 bg-[#0D0F10] border border-[#0D0F10] flex items-center justify-between px-4 md:px-10 rounded-lg relative">
      {/* Mobile Search Overlay */}
      <div
        className={`
          absolute inset-0 bg-white z-50 rounded-lg flex items-center px-4
          md:hidden
          transition-all duration-300 ease-in-out
          ${isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        <div className="flex-1 flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search..."
            className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
          />
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Title or Back Button */}
      <Brand style="h-[30px] sm:w-[150px] w-[130px]" />

      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        {/* User Profile */}
        <div
          onClick={() => router.push("/dashboard/profile")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <CustomAvatar name="Admin" size={36} />
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-white">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
