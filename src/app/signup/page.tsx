"use client";
import Link from "next/link"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios"
import { toast } from "react-hot-toast";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",

    })
    const [loading, setLoading] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");

        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        }finally {
            setLoading(false); 
        }
    }
    useEffect(() => {
        if (user.email && user.password && user.username) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">{loading? "Processing" : "Signup"}</h1>
            <div className="w-full max-w-md">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="Username" />
                    </div>
                    <div className="mb-4">
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
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
                        onClick={onSignup}
                        className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">{buttonDisabled ? "Please fill all fields" : "Signup"}
                        </button>
                    </div>
                        <Link href={"/login"} className="bg-slate-400 ml-20">visit login</Link>
                </form>
            </div>
        </div>
    )
}