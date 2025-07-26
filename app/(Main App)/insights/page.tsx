'use client'
import { useInsights } from "@/context/InsightsProvider";
import { useEffect } from "react";

export default function Insights() {
    const { insights,getInsights } = useInsights();

    useEffect(() => {
        getInsights();
    }, []);

    console.log(insights);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {insights ? (
                <div className="space-y-6">
                    {/* Key Takeaways */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
                        <p className="text-gray-700">{insights.key_takeaways}</p>
                    </div>

                    {/* Motivation Card */}
                    <div className="bg-blue-50 p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4 text-blue-800">Motivation</h2>
                        <p className="text-blue-700">{insights.motivation_card}</p>
                    </div>

                    {/* Patterns */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Patterns Identified</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            {insights.patterns.map((pattern, index) => (
                                <li key={index} className="text-gray-700">{pattern}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Top Triggers */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Top Triggers</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            {insights.top_triggers.map((trigger, index) => (
                                <li key={index} className="text-gray-700">{trigger}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Radar Scores */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Weekly Scores</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.entries(insights.radar_scores).map(([key, value]) => (
                                <div key={key} className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">{value}/5</div>
                                    <div className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Forward Guidance */}
                    {insights.forward_guidance && (
                        <div className="bg-green-50 p-6 rounded-lg shadow">
                            <h2 className="text-2xl font-bold mb-4 text-green-800">Forward Guidance</h2>
                            
                            {insights.forward_guidance.tips && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">Tips</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        {insights.forward_guidance.tips.map((tip, index) => (
                                            <li key={index} className="text-green-700">{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {insights.forward_guidance.reflection_prompt && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Reflection Prompt</h3>
                                    <p className="text-green-700">{insights.forward_guidance.reflection_prompt}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">No insights available for this week.</p>
                </div>
            )}
        </div>
    )
}