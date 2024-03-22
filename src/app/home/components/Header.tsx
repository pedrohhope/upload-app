"use client"
import { auth } from "@/app/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";


const Header = () => {
    const [user, loading] = useAuthState(auth);

    const router = useRouter()

    const handleSignOut = async () => {
        await auth.signOut();
        router.push("/login");
    };

    return (
        <div className="h-28">
            <div className="container flex justify-between items-center h-full">
                {!loading ? (
                    <div className="flex items-center gap-5">
                        <div>
                            <Avatar className="h-20 w-20 rounded-full">
                                <AvatarImage src={user?.photoURL as string} alt={user?.displayName as string} />
                                <AvatarFallback>{user?.displayName?.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                        </div>

                        <div>
                            <p>{user?.displayName}</p>
                            <p >signed with email {user?.email}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-5">
                        <div>
                            <Skeleton className="h-20 w-20 rounded-full" />
                        </div>

                        <div>
                            <Skeleton className="h-5 w-40 mb-3" />
                            <Skeleton className="h-5 w-96" />
                        </div>
                    </div>
                )}

                <div>
                    {user && (
                        <Button
                            onClick={handleSignOut}

                        >
                            Sign Out
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export { Header };

