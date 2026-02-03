export default function NavBar() {
    return (
        <div>
            <nav className="w-full bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <a href="/" className="text-xl font-bold text-gray-800">CV Maker</a>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="/" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                                <a href="/create" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Create CV</a>
                                <a href="/about" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">About</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}