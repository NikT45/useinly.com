import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

export interface InsightData {
    user_id: string;
    patterns: string[];
    radar_scores: {
        resilience: number;
        consistency: number;
        positive_coping: number;
        emotional_awareness: number;
        trigger_recognition: number;
    };
    top_triggers: string[];
    key_takeaways: string;
    motivation_card: string;
    forward_guidance: {
        tips: string[];
        reflection_prompt: string;
    };
    week_start_date: string;
}

export function useInsightsManager() {
    const supabase = createClient();
    const [insights, setInsights] = useState<InsightData | null>(null);
    
    // Function to get the start of the current week (Monday)
    function getCurrentWeekStart(): string {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If Sunday, subtract 6 days, else subtract (dayOfWeek - 1)
        const monday = new Date(now);
        monday.setDate(now.getDate() - daysToSubtract);
        
        // Format as YYYY-MM-DD using local time to avoid timezone issues
        const year = monday.getFullYear();
        const month = String(monday.getMonth() + 1).padStart(2, '0');
        const day = String(monday.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    async function getInsights() {
        const currentWeekStart = getCurrentWeekStart();
        
        const { data: insights, error } = await supabase
            .from('weekly_insights')
            .select('*')
            .eq('week_start_date', currentWeekStart);
            
        if (error) throw error;
        console.log("INSIGHTS DATA", insights);
        console.log("CURRENT WEEK START", currentWeekStart);

        // If no insights found for current week, set to null
        if (!insights || insights.length === 0) {
            setInsights(null);
            return null;
        }

        setInsights(insights[0].insight_data);
        return insights;
    }

    return {
        insights,
        getInsights
    };
}