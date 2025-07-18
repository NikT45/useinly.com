import { Check } from "lucide-react";
export default function PricingPage() {
    return (
        <div className="w-full min-h-full"
            style={{
                background: `linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, rgba(237, 177, 190, 0.5) 75%, rgba(218, 98, 125, 0.5) 100%), #F8F8F8`
            }}>

            <div className="min-h-screen mx-auto px-4 pt-12 lg:pt-16">
                {/* Main Heading */}
                <h1 className="text-center font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-brand-wine mb-6">
                    Plans for Every Step of Recovery
                </h1>

                {/* Subtitle */}
                <p className="text-center font-semibold text-lg md:text-xl max-w-2xl mx-auto text-brand-coral mb-12 lg:mb-16">
                    Transparent Pricing. Just Help — No Catch.
                </p>

                {/* Pricing Cards Container */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8 max-w-7xl mx-auto pb-12">

                    {/* Basic Plan Card */}
                    <div className="w-full max-w-[340px] h-[470px] lg:h-[470px] bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl">

                    </div>

                    {/* Pro Plan Card - Bigger */}
                    <div className="w-full max-w-[340px] lg:max-w-[370px] h-[470px] lg:h-[593px] flex flex-col items-center relative">
                        {/* Recommended Tag */}
                        <div className="flex flex-row justify-center items-center px-8 py-1.5 gap-2.5 w-[70%] h-[37px] bg-[#A53860] text-white font-semibold text-[20px] z-10" style={{ borderRadius: '20px 20px 0px 0px' }}>
                            Recommended
                        </div>

                        {/* Main Card */}
                        <div className="w-full h-full bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center gap-[32px] transition-all duration-300 hover:shadow-xl relative">
                            <h1 className="text-brand-wine text-3xl font-medium">New Chapter</h1>
                            <p className="text-brand-wine text-3xl font-semibold">
                                $10.99 <span className="text-brand-softPink text-sm">/week</span>
                            </p>
                            <div className="w-full flex flex-col gap-[8px]">
                                <div className="w-full h-[1px] bg-brand-softPink"></div>
                                <p className="text-brand-coral text-[14px] font-medium">Support you'll receive</p>
                            </div>
                            <div className="w-full flex flex-col gap-[12px]">
                                <div className="w-full flex flex-row items-center gap-[4px]">
                                    <Check className="w-5 h-5 text-brand-berry" strokeWidth={3} />
                                    <p className="text-brand-berry text-[16px] font-medium">60 minute weekly voice sessions</p>
                                </div>
                                <div className="w-full flex flex-row gap-[8px]">
                                    <Check className="w-5 h-5 text-brand-berry" strokeWidth={3} />
                                    <p className="text-brand-berry text-[16px] font-medium">Unlimited texting sessions</p>
                                </div>
                                <div className="w-full flex flex-row gap-[8px]">
                                    <Check className="w-5 h-5 text-brand-berry" strokeWidth={3} />
                                    <p className="text-brand-berry text-[16px] font-medium">Guided reflection prompts</p>
                                </div>
                                <div className="w-full flex flex-row gap-[8px]">
                                    <Check className="w-5 h-5 text-brand-berry" strokeWidth={3} />
                                    <p className="text-brand-berry text-[16px] font-medium">Personalized AI insights</p>
                                </div>
                                <div className="w-full flex flex-row gap-[8px]">
                                    <Check className="w-5 h-5 text-brand-berry" strokeWidth={3} />
                                    <p className="text-brand-berry text-[16px] font-medium">Priority support</p>
                                </div>
                            </div>

                            <div className="flex flex-col h-full w-full justify-end">
                                <button className="w-full h-[48px] bg-brand-berry hover:bg-brand-coral transition-all duration-100 text-white font-medium text-[16px] rounded-2xl">
                                    Make lasting change
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Premium Plan Card */}
                    <div className="w-full max-w-[340px] h-[470px] lg:h-[470px] bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl">

                    </div>

                </div>
            </div>
        </div>
    );
}
