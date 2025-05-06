import { useState, useEffect } from "react";
import logo from "../assets/logo.webp";
import { Fingerprint, Menu } from "lucide-react";

export default function TopNavigationBar({
  onTabChange,
  activeTab,
}: Readonly<{
  onTabChange: (tab: string) => void;
  activeTab: string;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (activeTab !== 'product') {
      onTabChange('product');
    }
  }, []);

  const navItems = [
    { name: "Product", value: "product" },
  ];

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  const handleNavClick = (tab: string) => {
    onTabChange(tab);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md rounded-b-xl font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-teal-600 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <Menu size={24} />
            </button>
          </div>

          <div className="flex items-center">
            <Fingerprint className="h-7 w-7 mr-2 text-teal-700" />
            <span className="text-2xl font-bold text-teal-700 tracking-tight">Admin Panel</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`px-4 py-2 rounded-lg font-medium text-base transition
                  ${
                    activeTab === item.value
                      ? "bg-teal-600 text-white shadow"
                      : "text-teal-700 hover:bg-teal-50 hover:text-teal-900"
                  }
                `}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`sm:hidden transition-all duration-200 ease-in-out ${
          isMenuOpen ? "block" : "hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-3 space-y-2 bg-white shadow rounded-b-xl">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`block w-full text-left px-4 py-2 rounded-lg font-medium text-base transition
                ${
                  activeTab === item.value
                    ? "bg-teal-600 text-white shadow"
                    : "text-teal-700 hover:bg-teal-50 hover:text-teal-900"
                }
              `}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
