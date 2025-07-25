import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

interface Reflection {
    id: string;
    title: string;
    content: string;
    created_at: string;
    user_id: string;
}

export function useReflectionsManager() {
    const supabase = createClient();
    const [reflections, setReflections] = useState<Reflection[]>([]);
    const [suggestedPrompt, setSuggestedPrompt] = useState<string>('');
    useEffect(() => {
        const fetchSuggestedPrompt = async () => {
            const {data, error} = await supabase.from('prompts').select('prompt');
            if (error) throw error;
            console.log(data);
            setSuggestedPrompt(data[0].prompt);
        }
        fetchSuggestedPrompt();
    }, []);

    async function getReflections() {
        const {data, error} = await supabase.from('reflections').select('*').order('created_at', { ascending: false });
        
        if (error) {
            console.error('Error fetching reflections:', error);
            return;
        }
        
        setReflections(data || []);
    }

    async function saveReflection(title: string | null, content: string) {
        const {data, error} = await supabase.functions.invoke('save-reflection', {
            body: {
                title: title,
                content
            }
        });
        if (error) {
            console.error(error);
            return;
        }

        // Parse the returned reflection data
        let newReflection: Reflection | null = null;
        try {
            // If data is a string, parse it as JSON first
            let parsedData = data;
            if (typeof data === 'string') {
                parsedData = JSON.parse(data);
                console.log('Parsed save reflection data:', parsedData);
            }
            
            // The parsed data should be the new reflection object
            if (parsedData && typeof parsedData === 'object' && 'id' in parsedData) {
                newReflection = parsedData as Reflection;
            }
        } catch (parseError) {
            console.error('Error parsing save reflection data:', parseError);
        }

        // If we successfully parsed the new reflection, add it to the array
        if (newReflection) {
            setReflections(prevReflections => [newReflection!, ...prevReflections]);
            console.log('Added new reflection to array:', newReflection);
        }

        return newReflection;
    }

    async function updateReflection(id: string, content: string) {
        const {data, error} = await supabase.functions.invoke('update-reflection', {
            body: {
                id,
                content,
            }
        });
        if (error) throw error;
        
        // Update the local state to reflect the changes immediately
        setReflections(prevReflections => 
            prevReflections.map(reflection => 
                reflection.id === id 
                    ? { ...reflection, content } 
                    : reflection
            )
        );
        
        return data;
    }

    return {
        reflections,
        getReflections,
        saveReflection,
        updateReflection,
        suggestedPrompt,
    }
}