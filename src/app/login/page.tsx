"use client";
import Link from "next/link"
import React from "react";
import { useRouter } from "next/navigation";
import axios  from "axios"
import toast from "react-hot-toast";


export default function LoginPage() {
    const router= useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",

    })
    const [loading, setLoading] = React.useState(false);
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">{loading? 'Loading': 'Login'}</h1>
            <div className="w-full max-w-md">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    
                    <div className="mb-4">
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="email" />
                    </div>
                    <div className="mb-6">
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="password" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                        onClick={onLogin}
                         className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Login
                        </button>
                    </div>
                        <Link href={"/signup"} className="bg-slate-400 ml-20">visit signup</Link>
                </form>
            </div>
        </div>
    )
}