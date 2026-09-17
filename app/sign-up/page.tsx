"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import {signUp} from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function Signup(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();

        setError("");
        setLoading(true);
        try {
            const result = await signUp.email({
                name,
                email,
                password
            });
            if(result.error){
                setError(result.error.message ?? "Failed to Signup");
            }
            else{
                router.push("/dashboard");
            }

        } catch (err) {
            setError("An unexpected error has occurred")
        } finally{
            setLoading(false)
        }

    }

    return(
        <div className=" flex min-h-[calc(100vh-4rem)] justify-center items-center p-4">
            <Card className=" w-full max-w-md shadow-lg">
                <CardHeader className=" space-y-1">
                    <CardTitle className=" text-center text-2xl font-bold">Sign Up</CardTitle>
                    <CardDescription className=" text-center text-gray-500">Create an account to track your job application</CardDescription>
                    <form onSubmit={handleSubmit}>
                        <CardContent className=" space-y-4">
                            {error && (
                                <div className=" rounded--md bg-destructive/15 p-3 text-sm text-destructive">
                                    {error}
                                </div>
                            )}
                            <div className=" space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                    id="name" 
                                    type="text" 
                                    required 
                                    value = {name}
                                    onChange={(e)=> setName(e.target.value)}
                                    className="border-gray-300 focus:border-primary focus:ring-primary"/>
                            </div>
                            
                            <div className=" space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    required
                                    value = {email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    className="border-gray-300 focus:border-primary focus:ring-primary"/>
                            </div>
                            
                            <div className=" space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    minLength={8} 
                                    required
                                    value = {password}
                                    onChange={(e)=> setPassword(e.target.value)}
                                    className="border-gray-300 focus:border-primary focus:ring-primary"/>
                            </div>                            
                        </CardContent>
                        <CardFooter className=" flex flex-col border-none">
                            <Button 
                                type="submit" 
                                className=" w-full bg-primary hover:bg-primary/90 "
                                disabled = {loading}
                            >
                                    {loading ? "Creating account" : "Sign Up"}
                                </Button>
                            <p className=" py-4 text-gray-500">Already have an account?<Link href="/sign-in" className=" font-medium text-primary hover:underline"> Sign in</Link> </p>
                        </CardFooter>
                    </form>
                </CardHeader>
            </Card>
        </div>
    )
}