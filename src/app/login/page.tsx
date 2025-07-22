"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useEffect, useState } from "react"
import { SLIDE_SHOW_IMAGES_PATH } from "@/constants/login"
import { useRouter } from "next/navigation"
import { Eye, EyeClosed } from "lucide-react"
import { cn } from "@/lib/utils"

const LoginPage = () => {
    const [displayPassword, setDisplayPassword] = useState<boolean>(false)
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const { push } = useRouter()

    const handleLogin = () => {
        push("/dashboard")
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % SLIDE_SHOW_IMAGES_PATH.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="rounded-xl lg:border bg-white m-auto h-screen w-full lg:h-144 lg:w-3/5 overflow-hidden shadow flex">
            <div className="space-y-8 p-8 w-1/2">
                <div>
                    <h1 className="font-bold text-2xl text-primary">SAA Inc.</h1>
                    <p className="">Please login to continue</p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                        <Label>Password</Label>
                        <div className={cn(
                            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex items-center",
                            "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]", // Changed from focus-visible to focus-within
                            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                            )}>
                            <input 
                                placeholder="Enter your password" 
                                type={displayPassword ? "text" : "password"} 
                                className="w-full outline-none bg-transparent"
                            />
                            {displayPassword ? (
                                <EyeClosed
                                size={18}
                                className="text-muted-foreground cursor-pointer hover:text-primary"
                                onClick={() => setDisplayPassword(false)}
                                />
                            ) : (
                                <Eye
                                size={18}
                                className="text-muted-foreground cursor-pointer hover:text-primary"
                                onClick={() => setDisplayPassword(true)}
                                />
                            )}
                            </div>
                    </div>
                    <Button onClick={handleLogin}>
                        Login
                    </Button>
                </div>
            </div>
            <div className="w-1/2 h-full relative overflow-hidden">
                {SLIDE_SHOW_IMAGES_PATH.map((img, index) => (
                    <div
                    key={img}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                    >
                    <Image
                        src={img}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover"
                    />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LoginPage