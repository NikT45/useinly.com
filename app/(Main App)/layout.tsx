import HeaderNav from "@/components/HeaderNav";
import { ConversationProvider } from "@/context/ConversationProvider";
export default function MainAppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ConversationProvider>
            <main className="min-h-screen flex flex-col">
                <div className="flex mt-4 mb-4 justify-center">
                    <HeaderNav />
                </div>
                <div className="flex-1 flex flex-col ">
                    {children}
                </div>
            </main>
        </ConversationProvider>
    );
}
