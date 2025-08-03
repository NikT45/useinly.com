'use client'
import { useInsights } from "@/context/InsightsProvider";
import { useEffect } from "react";
import { ChartRadarGridCircleFill } from "@/components/ChartRadarGridCircleFill";

export default function Insights() {
    const { insights, getInsights } = useInsights();

    useEffect(() => {
        getInsights();
    }, [getInsights]);

    console.log(insights);

    const renderValue = (value: unknown): React.ReactNode => {
        if (value === null || value === undefined) {
            return <span className="text-brand-wine">No data</span>;
        }

        if (Array.isArray(value)) {
            return (
                <ul className="list-disc pl-6 space-y-1">
                    {value.map((item, index) => (
                        <li key={index} className="text-brand-wine">
                            {renderValue(item)}
                        </li>
                    ))}
                </ul>
            );
        }

        if (typeof value === 'object') {
            return (
                <div className="space-y-3">
                    {Object.entries(value).map(([nestedKey, nestedValue]) => (
                        <div key={nestedKey}>
                            <h4 className="font-semibold text-brand-wine capitalize mb-1">
                                {nestedKey.replace(/_/g, ' ')}
                            </h4>
                            <div className="ml-4">
                                {renderValue(nestedValue)}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (typeof value === 'string' && value.length > 100) {
            return <p className="text-brand-wine leading-relaxed">{value}</p>;
        }

        return <span className="text-brand-wine">{String(value)}</span>;
    };



    // Transform radar_scores object to chart data format
    const transformRadarData = (radarScores: Record<string, unknown>) => {
        if (!radarScores || typeof radarScores !== 'object') {
            return undefined;
        }
        
        return Object.entries(radarScores).map(([category, score]) => ({
            category: category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            score: typeof score === 'number' ? Math.round(score) : parseInt(String(score)) || 0
        }));
    };

    return (
        <div className="p-6 w-[70%] mx-auto pb-96">
            {insights ? (
                <div className="space-y-4">
                    <div className="flex w-[70%] mt-10 flex-col items-start my-12">
                        <h2 className="text-[64px] text-brand-wine font-semibold"> Insights</h2>
                                                 {insights.week_start_date && (
                             <p className="italic text-brand-wine">{`Week of ${insights.week_start_date}`}</p>
                         )}
                    </div>
                    {/* Week Start Date */}

                    {/* Key Takeaways */}
                    {insights.key_takeaways && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold mb-4 text-brand-wine">Key Takeaways</h2>
                            <div>{renderValue(insights.key_takeaways)}</div>
                        </div>
                    )}

                    {/* Radar Scores */}
                    {insights.radar_scores && (
                        <div className="mb-6 p-12">
                            <ChartRadarGridCircleFill 
                                data={transformRadarData(insights.radar_scores)}
                                title="Wellness Radar Scores"
                                description="Your wellness metrics for this week"
                            />
                        </div>
                    )}

                    {/* Top Triggers */}
                    {insights.top_triggers && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold mb-4 text-brand-wine">Top Triggers</h2>
                            <div>{renderValue(insights.top_triggers)}</div>
                        </div>
                    )}

                    {/* Patterns */}
                    {insights.patterns && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold mb-4 text-brand-wine">Patterns</h2>
                            <div>{renderValue(insights.patterns)}</div>
                        </div>
                    )}

                    {/* Forward Guidance */}
                    {insights.forward_guidance && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold mb-4 text-brand-wine">Forward Guidance</h2>
                            <div>{renderValue(insights.forward_guidance)}</div>
                        </div>
                    )}

                    {/* Motivation Card */}
                    {insights.motivation_card && (
                        <div className="bg-white pt-64 pb-128 ">
                            <h1 className="text-brand-wine text-[24px] text-center font-semibold">{insights.motivation_card}</h1>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-brand-wine">No insights available for this week.</p>
                </div>
            )}
        </div>
    )
}