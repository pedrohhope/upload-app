"use client"
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { FilesList } from "./components/FilesList";
import { Header } from "./components/Header";

export default function HomePage() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter()

    if (!user && !loading) {
        router.push("/login");
        return <></>;
    }


    return (
        <main>
            <Header />
            <div className="flex justify-center mt-48">
                <FilesList />
            </div>
        </main >
    );
}
