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
        
        if (error) {
            console.error('Error fetching reflections:', error);
            return;
        }
        
        // Handle different possible data structures
        let reflectionsArray: Reflection[] = [];
        
        try {
            // If data is a string, parse it as JSON first
            let parsedData = data;
            if (typeof data === 'string') {
                parsedData = JSON.parse(data);
                console.log('Parsed data:', parsedData);
            }
            
            if (Array.isArray(parsedData)) {
                reflectionsArray = parsedData;
            } else if (parsedData && typeof parsedData === 'object') {
                // Check if data is wrapped in another object
                if (Array.isArray(parsedData.data)) {
                    reflectionsArray = parsedData.data;
                } else if (Array.isArray(parsedData.reflections)) {
                    reflectionsArray = parsedData.reflections;
                } else {
                    // Try to convert the object to an array
                    reflectionsArray = Object.values(parsedData).filter(item => 
                        item && typeof item === 'object' && 'id' in item
                    ) as Reflection[];
                }
            }
        } catch (parseError) {
            console.error('Error parsing data:', parseError);
            reflectionsArray = [];
        }
        
        console.log('Final reflections array:', reflectionsArray);
        console.log('Array length:', reflectionsArray.length);
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
    }
}