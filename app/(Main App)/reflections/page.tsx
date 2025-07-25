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



    return (
        <div className="mt-32 flex-1 flex flex-col items-center h-full w-full">
            <div className="flex-1 flex flex-col items-center h-full w-[70%]">
                <NewReflectionEntry onSave={() => {}} onCancel={() => {}} suggestPrompt="What did you do today?" />
                {/* <p>{reflections.length}</p> */}
                {reflections.map((reflection, index) => (
                    <div key={index} className="flex flex-col w-[95%]">
                        <ReflectionEntry 
                            id={reflection.id}
                            title={reflection.title}
                            text={reflection.content} 
                            date={reflection.created_at}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}