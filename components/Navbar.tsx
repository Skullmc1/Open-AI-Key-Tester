const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-[#800020]">OpenAI Tester</h1>
          <span className="ml-2 px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-400">
            API Key Testing
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
