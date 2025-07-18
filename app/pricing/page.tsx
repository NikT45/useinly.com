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
                    Transparent pricing for AI-powered addiction support.
                </p>

                {/* Pricing Cards Container */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8 max-w-7xl mx-auto pb-12">

                    {/* Basic Plan Card */}
                    <div className="w-full max-w-[340px] h-[470px] lg:h-[470px] bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
                        
                    </div>

                    {/* Pro Plan Card - Bigger */}
                    <div className="w-full max-w-[340px] lg:max-w-[370px] h-[470px] lg:h-[556px] bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl relative">
                        
                    </div>

                    {/* Premium Plan Card */}
                    <div className="w-full max-w-[340px] h-[470px] lg:h-[470px] bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
                        
                    </div>

                </div>
            </div>
        </div>
    );
}
