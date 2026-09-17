"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function ImageTabs(){
    const [activeTab,setActiveTab] = useState("organize")
    return(
        <section className=" border-t py-16">
          <div className=" container mx-auto px-2">
            <div className=" mx-auto max-w-6xl">
              {/* Tabs */}
              <div className=" flex gap-2 justify-center mb-4">
                <Button onClick={()=> setActiveTab("organize")}
                  className={` rounded-lg px-6 py-3 font-medium text-sm transition-colors ${activeTab === "organize"? "bg-primary text-white":" bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                  Organize Applications
                </Button>
                <Button onClick={()=> setActiveTab("hired")}
                  className={` rounded-lg px-6 py-3 font-medium text-sm transition-colors ${activeTab === "hired"? "bg-primary text-white":" bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                  Get Hired
                </Button>
                <Button onClick={()=> setActiveTab("boards")}
                  className={` rounded-lg px-6 py-3 font-medium text-sm transition-colors ${activeTab === "boards"? "bg-primary text-white":" bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                  Manage Boards
                </Button>
              </div>
              {/* Images */}
              <div className=" relative border border-gray-200 max-w-5xl rounded-lg shadow-2xl overflow-hidden ">
                {activeTab === "organize" && (<Image 
                  src="/hero-images/hero1.png" 
                  alt="Organize Applications" 
                  width={1200}
                  height={800}
                />)}

                {activeTab === "hired" && (<Image 
                  src="/hero-images/hero2.png" 
                  alt="Get Hired" 
                  width={1200}
                  height={800}
                />)}

                {activeTab === "boards" && (<Image 
                  src="/hero-images/hero3.png" 
                  alt="Manage Boards" 
                  width={1200}
                  height={800}
                />)}
              </div>
            </div>
          </div>
        </section>
    )
}