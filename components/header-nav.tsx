export default function HeaderNav() {
    return (
        <nav className="w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between py-4">
                    <a 
                        href="#" 
                        className="text-gray-700 hover:text-purple-400 transition-colors duration-200 relative group"
                    >
                        <span className="py-2">Chat</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    
                    <a 
                        href="#" 
                        className="text-gray-700 hover:text-purple-400 transition-colors duration-200 relative group"
                    >
                        <span className="py-2">Insights</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    
                    <a 
                        href="#" 
                        className="text-gray-700 hover:text-purple-400 transition-colors duration-200 relative group"
                    >
                        <span className="py-2">Reflections</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    
                    <a 
                        href="#" 
                        className="text-gray-700 hover:text-purple-400 transition-colors duration-200 relative group"
                    >
                        <span className="py-2">My Account</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                </div>
            </div>
        </nav>
    )
}