"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth/auth-client";

export default function Signin(){

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
            const result = await signIn.email({
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
                    <CardTitle className=" text-center text-2xl font-bold">Sign In</CardTitle>
                    <CardDescription className=" text-center text-gray-500">Enter the credentials to access your account</CardDescription>
                    <form onSubmit={handleSubmit}>
                        <CardContent className=" space-y-4">
                            {error && (
                                <div className=" rounded--md bg-destructive/15 p-3 text-sm text-destructive">
                                    {error}
                                </div>
                            )}
                            <div className=" space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    value={email}
                                    onChange={e=> setEmail(e.target.value)}
                                    required
                                    className="border-gray-300 focus:border-primary focus:ring-primary"/>
                            </div>
                            
                            <div className=" space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    value={password}
                                    onChange={e=> setPassword(e.target.value)}
                                    minLength={8} 
                                    required
                                    className="border-gray-300 focus:border-primary focus:ring-primary"/>
                            </div>                            
                        </CardContent>
                        <CardFooter className=" flex flex-col border-none">
                            <Button 
                                type="submit" 
                                className=" w-full bg-primary hover:bg-primary/90"
                                disabled={loading}
                            >
                                {loading ? "Signing In...":"Sign In"}
                            </Button>
                            <p className=" py-4 text-gray-500">Don't have an account?<Link href="/sign-up" className=" font-medium text-primary hover:underline"> Sign up</Link> </p>
                        </CardFooter>
                    </form>
                </CardHeader>
            </Card>
        </div>
    )
}