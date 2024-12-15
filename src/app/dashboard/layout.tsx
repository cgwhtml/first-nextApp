// src/app/dashboard/layout/page.tsx
'use client'
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState(0);
    
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="border-2 border-dashed border-white p-8 w-1/2 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="flex gap-4 font-bold text-lg mb-4 text-purple-500 justify-center">
                    <Link href="/dashboard/about">About</Link>
                    <Link href="/dashboard/settings">Settings</Link>
                </div>
                <h2 className="text-center text-white">Dashboard Layout {count}</h2>
                <div className="flex justify-center">
                    <button 
                        className="bg-black text-white p-2 my-4 rounded-md hover:bg-gray-800 transition-colors" 
                        onClick={() => setCount(count + 1)}
                    >
                        Increment
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}