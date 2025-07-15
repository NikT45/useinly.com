"use client"
import ReflectionEntry from "@/components/reflectionEntry"
import NewReflectionEntry from "@/components/newReflectionEntry"
import { useReflection } from "@/context/ReflectionProvider"
import { useEffect } from "react"

export default function Reflections() {

    const {reflections, getReflections} = useReflection();

    useEffect(() => {
        getReflections();
    }, []);

    return (
        <div className="flex-1 flex flex-col items-center justify-center h-full w-full">
            <div className="flex-1 flex flex-col items-center justify-center h-full w-[75%]">
                <NewReflectionEntry onSave={() => {}} onCancel={() => {}} suggestPrompt="What did you do today?" />
                <p>{reflections.length}</p>
                {reflections.map((reflection, index) => (
                    <div key={index} className="flex flex-col w-full">
                        <ReflectionEntry text={reflection.content} date={reflection.created_at} />
                    </div>
                ))}
            </div>
        </div>
    )
}