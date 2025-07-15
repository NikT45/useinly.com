import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

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

    async function getReflections() {
        const {data, error} = await supabase.functions.invoke('get-reflection');
        console.log('Raw data from Supabase:', data);
        console.log('Data type:', typeof data);
        console.log('Is array?', Array.isArray(data));
        if (error) {
            console.error('Error fetching reflections:', error);
            return;
        }
        // Handle the case where data might be a JSON string
        let reflectionsArray;
        if (Array.isArray(data)) {
            reflectionsArray = data;
        } else if (typeof data === 'string') {
            try {
                const parsed = JSON.parse(data);
                reflectionsArray = Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                console.error('Failed to parse JSON:', e);
                reflectionsArray = [];
            }
        } else {
            reflectionsArray = [];
        }
        console.log('Setting reflections to:', reflectionsArray);
        setReflections(reflectionsArray);
    }

    async function saveReflection(title: string, content: string) {
        const {data, error} = await supabase.functions.invoke('save-reflection', {
            body: {
                title,
                content
            }
        });
        if (error) {
            console.error(error);
            return;
        }
        return data;
    }

    async function updateReflection(id: string, content: string) {
        const {data, error} = await supabase.functions.invoke('update-reflection', {
            body: {
                id,
                content,
            }
        });
        if (error) throw error;
        return data;
    }

    return {
        reflections,
        getReflections,
        saveReflection,
        updateReflection,
    }
}