import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-wine text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Inly</h3>
            <p className="text-brand-softPink max-w-md">
              Break free from limiting patterns and build healthier habits with your AI-powered mental wellness companion, available 24/7.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-brand-softPink hover:text-white transition-colors">Home</Link></li>
              {/* <li><Link href="/pricing" className="text-brand-softPink hover:text-white transition-colors">Pricing</Link></li> */}
              <li><Link href="/#features" className="text-brand-softPink hover:text-white transition-colors">Features</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-brand-softPink hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-brand-softPink hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-berry mt-8 pt-8 text-center text-brand-softPink">
          <p>&copy; {new Date().getFullYear()} Inly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}