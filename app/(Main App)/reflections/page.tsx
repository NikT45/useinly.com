"use client"
import ReflectionEntry from "@/components/reflectionEntry"
import NewReflectionEntry from "@/components/newReflectionEntry"
import { useReflection } from "@/context/ReflectionProvider"
import { useEffect } from "react"

export default function Reflections() {

    const {reflections, getReflections, updateReflection} = useReflection();

    useEffect(() => {
        getReflections();
    }, []);

    const handleUpdateReflection = async (id: string, content: string) => {
        try {
            await updateReflection(id, content);
        } catch (error) {
            console.error('Failed to update reflection:', error);
            // Could add user-facing error handling here
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center h-full w-full">
            <div className="flex-1 flex flex-col items-center justify-center h-full w-[75%]">
                <NewReflectionEntry onSave={() => {}} onCancel={() => {}} suggestPrompt="What did you do today?" />
                <p>{reflections.length}</p>
                {reflections.map((reflection, index) => (
                    <div key={index} className="flex flex-col w-full">
                        <ReflectionEntry 
                            id={reflection.id}
                            text={reflection.content} 
                            date={reflection.created_at}
                            onUpdate={handleUpdateReflection}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}