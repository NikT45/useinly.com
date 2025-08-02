import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="flex-1 w-full p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-brand-berry hover:text-brand-wine transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-brand-wine mb-6 text-center">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-brand-wine mb-4"><strong>Effective Date:</strong> [Insert Date]</p>
          
          <div className="space-y-4 text-brand-wine">
            <div>
              <h3 className="text-lg font-medium mb-2">1. No Medical Advice</h3>
              <p>This app is not a medical device or substitute for professional therapy. It is a self-guided emotional support tool powered by artificial intelligence. No content within the app should be interpreted as clinical advice, diagnosis, or treatment.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">2. Limitation of Liability</h3>
              <p className="mb-2">You use this app entirely at your own risk. To the fullest extent permitted by law, we disclaim all liability for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Emotional distress</li>
                <li>Habit relapse or failure to change behavior</li>
                <li>Technical errors, outages, or data loss</li>
                <li>Inaccurate or unexpected AI responses</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">3. No Warranties</h3>
              <p>The app is provided &#34;as is&#34; and &#34;as available&#34;. We make no guarantees about its availability, effectiveness, or accuracy.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">4. Eligibility</h3>
              <p>By using the app, you confirm you are at least 13 years old and legally allowed to use it in your jurisdiction.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">5. Termination</h3>
              <p>We reserve the right to suspend or terminate access to the app at any time, without notice.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">6. Changes to Terms</h3>
              <p>We may update these terms at any time. Continued use of the app after changes constitutes your acceptance of the new terms.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
