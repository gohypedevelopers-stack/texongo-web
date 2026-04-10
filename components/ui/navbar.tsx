"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { 
    name: "FabricaVision", 
    href: "/fabricavision",
    megaMenu: [
      {
        title: "Knit Style",
        items: [
          "Single Jersey", "French Terry", "Fleece", "Rib", "Spandex Knits", 
          "Pique", "Interlock", "Waffle", "Jacquard", "Stripes", 
          "Corduroy Vellour", "Printed", "Shiffly", "Ponte", "Yarn", "Neps", "Popcorn"
        ]
      },
      {
        title: "Blends",
        items: [
          "Cotton", "Viscose", "Cotton Modal", "Giza/ Egyptian", "Melange", 
          "Nylon", "Poly Cotton", "Polyester", "Slubs", "Spandex Blends", "Supima"
        ]
      },
      {
        title: "Sustainable Blends",
        items: [
          "Wool", "Australian", "Banana-Fabric", "Eco Vero", "Hemp", 
          "Linen", "Lotus", "Modal", "Organic Cotton", "Recycled Cotton", "Tencel"
        ]
      },
      {
        title: "Menwear",
        items: ["Cargo", "Hoodies", "Co-ord", "Tshirt", "Joggers", "Loungewear", "Polos", "Sweatshirt"]
      },
      {
        title: "Womenwear",
        items: ["Tshirt/ tops", "Athleisure", "Co-ords", "Dresses", "Hoodie", "Jumpsuits", "Lining", "Polos", "Scarves", "Skirts", "Sweatshirt"]
      }
    ]
  },
  { 
    name: "3D Studio", 
    href: "/3d-studio",
    dropdown: [
      { name: "Digital Drape", href: "/3d-studio/digital-drape" },
      { name: "Digital Fall", href: "/3d-studio/digital-fall" },
      { name: "Digital Fashion", href: "/3d-studio/digital-fashion" },
    ]
  },
  { name: "Blog", href: "/blog" },
  { name: "Knit Style", href: "/fabrics" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
];

export function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHoveredTop, setIsHoveredTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVisible = !isHome || isScrolled || isHoveredTop;

  return (
    <>
      {isHome && !isScrolled && (
        <div 
          className="fixed top-0 left-0 w-full h-10 z-[110]" 
          onMouseEnter={() => setIsHoveredTop(true)}
        />
      )}

      <motion.nav 
        initial={false}
        animate={{ 
          y: isVisible ? 0 : -132, 
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        onMouseLeave={() => setIsHoveredTop(false)}
        className={`${
          isHome ? "fixed" : "relative"
        } top-0 left-0 w-full bg-white border-b border-gray-100 z-[100]`}
      >
      {/* Top Bar: Logo, Search, Icons */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="https://texongo.com/wp-content/uploads/2021/07/Texongo-Logo-1.png"
            alt="Texongo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 bg-gray-50 border border-gray-200 rounded px-4 pr-10 text-sm focus:outline-none focus:border-black transition-colors"
          />
          <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-black text-white rounded-r">
            <Search size={18} />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <Link href="/account" className="text-gray-600 hover:text-black transition-colors">
            <User size={22} />
          </Link>
          <Link href="/cart" className="text-gray-600 hover:text-black transition-colors">
            <ShoppingBag size={22} />
          </Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-12 flex items-center justify-center overflow-visible whitespace-nowrap hide-scroll">
        <ul className="flex items-center gap-8 h-full">
          {navItems.map((item) => (
            <li 
              key={item.name} 
              className={`${item.megaMenu ? "" : "relative"} h-full flex items-center`}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors h-full"
              >
                {item.name}
                {(item.dropdown || item.megaMenu) && (
                  <ChevronDown 
                    size={12} 
                    className={`transition-transform duration-300 ${hoveredItem === item.name ? "rotate-180" : ""}`} 
                  />
                )}
              </Link>

              {/* Dropdown or Mega Menu */}
              <AnimatePresence>
                {hoveredItem === item.name && (item.dropdown || item.megaMenu) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`absolute top-full z-[110] bg-[#f5f5f5] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-100 ${
                      item.megaMenu 
                        ? "fixed md:absolute left-0 right-0 mx-auto w-[calc(100vw-3rem)] max-w-[1440px]" 
                        : "left-0 min-w-48"
                    }`}
                  >
                    {item.dropdown && (
                      <ul className="flex flex-col py-4">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className="block px-6 py-3 text-[12px] font-medium text-gray-400 hover:text-black hover:bg-black/5 transition-all"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.megaMenu && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-12 overflow-y-auto max-h-[80vh] md:max-h-none">
                        {item.megaMenu.map((category) => (
                          <div key={category.title} className="flex flex-col gap-6">
                            <h3 className="text-[13px] font-black uppercase tracking-[0.2em] text-[#121212]">
                              {category.title}
                            </h3>
                            <ul className="flex flex-col gap-3">
                              {category.items.map((subItem) => (
                                <li key={subItem}>
                                  <Link
                                    href={`/fabrics?category=${subItem.toLowerCase().replace(/ /g, '-')}`}
                                    className="text-[12px] font-medium text-gray-400 hover:text-black transition-colors"
                                  >
                                    {subItem}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
      </motion.nav>
    </>
  );
}
