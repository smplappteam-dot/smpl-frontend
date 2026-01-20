import React from "react";
import Link from "next/link";
import { Bell, Search, Settings } from "lucide-react";

export const AdminNavbar = () => {
  return (
    <nav className="h-16 border-b border-white/10 bg-[#0A0A0A] flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
          Admin Console
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar - Placeholder */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors w-64"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 ml-2"></div>
        </div>
      </div>
    </nav>
  );
};
