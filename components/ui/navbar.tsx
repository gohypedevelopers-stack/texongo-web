"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, ChevronDown, Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCartStore, useAuthStore } from "@/lib/store";
import { AuthModal } from "./auth-modal";

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
          "Nylon", "Poly Cotton", "Polyester", "Slubs", "Spandex Blends", "Australian"
        ]
      },
      {
        title: "Menwear",
        items: [
          "Cargo", "Hoodies", "Co-ord", "Tshirt", "Joggers",
          "Loungewear", "Polos", "Sweatshirt"
        ]
      },
      {
        title: "Womenwear",
        items: [
          "Tshirt/ tops", "Athleisure", "Co-ords", "Dresses", "Hoodie",
          "Jumpsuits", "Lining", "Polos", "Scarves", "Skirts", "Sweatshirt"
        ]
      },
      {
        title: "Sustainable Blends",
        items: [
          "Wool", "Supima", "Banana-Fabric", "Eco Vero", "Hemp",
          "Linen", "Lotus", "Modal", "Organic Cotton", "Recycled Cotton", "Tencel", "BCI"
        ]
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
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [exitTimeout, setExitTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const { getItemCount, toggleCart } = useCartStore();
  const { isLoggedIn, user, openAuthModal, logout } = useAuthStore();
  const itemCount = getItemCount();
  const isHome = pathname === "/";
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Initial check
    checkIsDesktop();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("resize", checkIsDesktop);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update visibility logic: 
  // Desktop: strictly hover or mobile menu open
  // Mobile: hover, scrolled, menu open, or internal page
  const isVisible = isDesktop
    ? (isHovered || isMobileMenuOpen)
    : (isHoveredTop || isScrolled || isMobileMenuOpen || !isHome);

  const handleMouseEnter = () => {
    if (exitTimeout) {
      clearTimeout(exitTimeout);
      setExitTimeout(null);
    }
    setIsHovered(true);
    setIsHoveredTop(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay before hiding on desktop to prevent flickering
    if (isDesktop) {
      const timeout = setTimeout(() => {
        setIsHovered(false);
        setIsHoveredTop(false);
      }, 300); // 300ms grace period
      setExitTimeout(timeout);
    } else {
      setIsHovered(false);
      setIsHoveredTop(false);
    }
  };

  return (
    <>
      {/* Persistent trigger area for desktop */}
      {isDesktop && isMounted && (
        <div
          className="fixed top-0 left-0 w-full h-4 z-[110] bg-transparent"
          onMouseEnter={handleMouseEnter}
        />
      )}

      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -132, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -132, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed top-0 left-0 w-full bg-white border-b border-gray-100 z-[100]"
          >
            {/* Top Bar: Logo, Search, Icons */}
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 h-16 md:h-20 flex items-center justify-between gap-2 md:gap-8">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <Link href="/" className="flex-shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                <img
                  src="https://texongo.com/wp-content/uploads/2025/09/Untitled-design-2-1-e1758707290987.png"
                  alt="Texongo"
                  className="h-8 md:h-10 w-auto"
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
              <div className="flex items-center gap-3 sm:gap-6">
                <div
                  className="relative"
                  onMouseEnter={() => isLoggedIn && setIsAccountOpen(true)}
                  onMouseLeave={() => setIsAccountOpen(false)}
                >
                  <button
                    onClick={() => !isLoggedIn && openAuthModal()}
                    className="text-gray-600 hover:text-black transition-colors flex items-center gap-2 h-16 md:h-20"
                  >
                    <User size={22} />
                    {isLoggedIn && user && (
                      <span className="text-[10px] font-black uppercase tracking-widest hidden xl:block">Hi, {user.name}</span>
                    )}
                  </button>

                  <AnimatePresence>
                    {isLoggedIn && isAccountOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[80%] right-0 w-48 bg-white border border-gray-100 shadow-xl z-[120] py-2 overflow-hidden"
                      >
                        <Link
                          href="/orders"
                          className="flex items-center gap-3 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-all border-b border-gray-50"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsAccountOpen(false);
                            window.location.href = "/";
                          }}
                          className="w-full flex items-center justify-between px-6 py-4 text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => toggleCart(true)}
                  className="text-gray-600 hover:text-black transition-colors relative"
                >
                  <ShoppingBag size={22} />
                  {isMounted && itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#57AD43] text-[8px] md:text-[9px] text-white font-black w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center rounded-full">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex max-w-[1440px] mx-auto px-6 lg:px-10 h-12 items-center justify-center overflow-visible whitespace-nowrap">
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
                          className={`absolute top-full z-[110] bg-[#f5f5f5] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-100 ${item.megaMenu
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

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white z-[90] md:hidden overflow-y-auto"
                >
                  <div className="p-6 space-y-4">
                    {/* Mobile Search */}
                    <div className="relative mb-8">
                      <input
                        type="text"
                        placeholder="Search fabrics..."
                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-full px-6 text-sm focus:outline-none"
                      />
                      <button className="absolute right-2 top-1 h-10 w-10 flex items-center justify-center bg-black text-white rounded-full">
                        <Search size={16} />
                      </button>
                    </div>

                    <ul className="space-y-2">
                      {navItems.map((item) => (
                        <li key={item.name} className="border-b border-gray-50 pb-2">
                          <div className="flex items-center justify-between">
                            <Link
                              href={item.href}
                              className="text-sm font-black uppercase tracking-[0.1em] py-3 block"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                            {(item.megaMenu || item.dropdown) && (
                              <button
                                onClick={() => setActiveAccordion(activeAccordion === item.name ? null : item.name)}
                                className="p-3"
                              >
                                <ChevronDown
                                  size={18}
                                  className={`transition-transform ${activeAccordion === item.name ? "rotate-180" : ""}`}
                                />
                              </button>
                            )}
                          </div>

                          {/* Accordion Content */}
                          <AnimatePresence>
                            {activeAccordion === item.name && (item.megaMenu || item.dropdown) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                {item.dropdown && (
                                  <ul className="pl-4 py-2 space-y-3">
                                    {item.dropdown.map((sub) => (
                                      <li key={sub.name}>
                                        <Link
                                          href={sub.href}
                                          className="text-xs font-bold text-gray-400 uppercase tracking-widest"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                          {sub.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                {item.megaMenu && (
                                  <div className="pl-4 py-4 space-y-6">
                                    {item.megaMenu.map((cat) => (
                                      <div key={cat.title}>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-3">
                                          {cat.title}
                                        </h4>
                                        <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                                          {cat.items.map((sub) => (
                                            <li key={sub}>
                                              <Link
                                                href={`/fabrics?category=${sub.toLowerCase().replace(/ /g, '-')}`}
                                                className="text-[10px] font-bold text-gray-400"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                              >
                                                {sub}
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

                    {/* Mobile Account / Auth */}
                    <div className="pt-8 border-t border-gray-100 flex flex-col gap-4">
                      {isLoggedIn ? (
                        <>
                          <Link href="/orders" className="text-sm font-black uppercase tracking-widest text-[#57AD43]" onClick={() => setIsMobileMenuOpen(false)}>
                            My Orders
                          </Link>
                          <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-sm font-black uppercase tracking-widest text-red-500 text-left">
                            Logout
                          </button>
                        </>
                      ) : (
                        <button onClick={() => { openAuthModal(); setIsMobileMenuOpen(false); }} className="text-sm font-black uppercase tracking-widest text-black text-left">
                          Sign In
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
      <AuthModal />
    </>
  );
}
