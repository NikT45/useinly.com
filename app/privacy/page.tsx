import Link from "next/link";

export default function PrivacyPolicy() {
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
        <h1 className="text-3xl font-bold text-brand-wine mb-6 text-center">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-brand-wine mb-4"><strong>Effective Date:</strong> August 4, 2025</p>
          
          <div className="space-y-4 text-brand-wine">
            <div>
              <h3 className="text-lg font-medium mb-2">1. Information We Collect</h3>
              <p className="mb-2">We collect only the information necessary to provide you with our AI-powered habit-breaking and emotional support services, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Email and login credentials</li>
                <li>Messages you submit to the app (voice or text)</li>
                <li>Usage statistics (e.g., session time, frequency)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">2. How We Use Your Information</h3>
              <p className="mb-2">Your information is used solely to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide personalized content and prompts</li>
                <li>Improve the app&apos;s performance and AI capabilities</li>
                <li>Maintain the security of your account</li>
              </ul>
              <p className="mt-2">We do not sell your data. We may share data with trusted service providers (e.g., AI processing, analytics, cloud infrastructure), but only to deliver the app&apos;s features.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">3. Data Retention</h3>
              <p>We retain user data only as long as needed to provide our services or comply with legal requirements. You may request account deletion at any time.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">4. Security</h3>
              <p>We use industry-standard security practices, but we cannot guarantee absolute security. Use the app at your own risk.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">5. Your Rights</h3>
              <p className="mb-2">You may:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Request access to your data</li>
                <li>Request deletion of your account and associated data</li>
              </ul>
              <p className="mt-2">To make a request, email: <a href="mailto:support@useinly.com" className="text-brand-berry hover:text-brand-wine transition-colors">support@inly.ai</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
