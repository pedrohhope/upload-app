"use client"
import { auth } from "@/app/firebase";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";


const Header = ({
    loading,
    user
}: {
    loading: boolean
    user: User
}) => {
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
                            <img
                                src={user?.photoURL!}
                                className="h-20 w-20 rounded-full"
                            />
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
