"use client"
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { FilesList } from "./components/FilesList";
import { Header } from "./components/Header";

export default function FilesPage({
    searchParams,
}: {
    searchParams?: {
        search?: string;
    };
}) {
    const [user, loading] = useAuthState(auth);
    const router = useRouter()
    const { search } = searchParams || {};

    if (!user && !loading) return router.push("/login")
    return (
        <main>
            <Header loading={loading} user={user as User} />
            <div className="h-screen w-screen flex justify-center mt-48">
                <FilesList search={search || ""} user={user as User} loading={loading} />
            </div>
        </main>
    );
}
