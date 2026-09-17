"use client"

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import SignoutBtn from "./sign-out-btn";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useSession } from "@/lib/auth/auth-client";


export default function Navbar(){
    const {data: session} = useSession()

    return(
        <nav className=" border border-gray-200">
            <div className=" flex container h-16 mx-auto px-2 items-center justify-between">
                <Link href="/" className=" flex items-center text-xl font-semibold text-primary gap-2">
                        <Briefcase/>
                        Job Tracker
                </Link>
                <div className=" flex gap-2">
                    {session?.user ? (
                        <>
                        <Link href="/dashboard">
                            <Button 
                                variant="ghost"
                                className=" text-gray-700 hover:text-black"
                            >
                                Dashboard
                            </Button>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost"
                                        className=" relative h-8 w-8 rounded-full">
                                    <Avatar>
                                        <AvatarFallback className=" bg-primary text-white">
                                            {session.user.name[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className=" w-56" align="end">
                                <DropdownMenuLabel className=" font-normal">
                                    <div className=" flex flex-col space-y-1">
                                        <p className=" text-sm font-medium leading-none">{session.user.name}</p>
                                        <p className=" text-xs leading-none text-muted-foreground">{session.user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <SignoutBtn></SignoutBtn>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </>
                    ):(
                    <>
                        <Link href="/sign-in">
                            <Button variant={"ghost"}>Log In</Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button className=" bg-primary hover:bg-primary/90">Start for free</Button>
                        </Link>
                    </>)}
                </div>
            </div>   
        </nav>
    )
}