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
        const {data, error} = await supabase.from('reflections').insert({
            title: title,
            content: content
        });
        if (error) throw error;

        getReflections();
     
    }

    async function updateReflection(id: string, content: string, title:string | null) {
        const {data, error} = await supabase.from('reflections').update({
            title: title,
            content: content
        }).eq('id', id);
        if (error) throw error;

        getReflections();
    
    }

    return {
        reflections,
        getReflections,
        saveReflection,
        updateReflection,
        suggestedPrompt,
    }
}