// src/app/dashboard/layout/page.tsx
'use client'
import { useState } from "react";

export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState(0);
    
    return (
        <div className="border-2 border-dashed border-black p-4 w-1/2 mx-auto">
            <h2 className="text-center text-white">Dashboard template {count}</h2>
            <div className="flex justify-center">
                <button className="bg-black text-white p-2 my-4 rounded-md" onClick={() => setCount(count + 1)}>Increment</button>
            </div>
            {children}
        </div>
    );
}