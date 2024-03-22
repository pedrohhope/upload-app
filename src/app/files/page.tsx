"use client"
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

    if (!user && !loading) return router.push("/login");


    return (
        <main>
            <Header />
            <div className="flex justify-center mt-48">
                <FilesList />
            </div>
        </main >
    );
}
