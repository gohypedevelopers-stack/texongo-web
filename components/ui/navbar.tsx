"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, ChevronDown, Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCartStore, useAuthStore } from "@/lib/store";

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "FabricaVision",
    href: "#",
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
    href: "#",
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleItemMouseEnter = (itemName: string) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setHoveredItem(itemName);
  };

  const handleItemMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    hoverTimeout.current = setTimeout(() => {
      setHoveredItem(null);
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    hoverTimeout.current = setTimeout(() => {
      setHoveredItem(null);
    }, 200);
  };

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
  // Always visible as per user request for "sticky" navbar
  const isVisible = true;

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
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: isScrolled ? 10 : 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`fixed left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] z-[1000] transition-all duration-500 ${isScrolled
              ? "top-0"
              : "top-6"
              }`}
          >
            {/* Glassmorphism Pill Container */}
            <div className="relative flex items-center justify-between px-8 md:px-12 h-12 md:h-14 bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-full transition-all duration-500" id="navbar-pill">

              {/* Logo */}
              <Link href="/" className="flex-shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                <img
                  src="/logos/logo.png"
                  alt="Texongo"
                  className="h-5 md:h-6.5 w-auto object-contain"
                />
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex flex-1 items-center justify-center px-12">
                <ul className="flex items-center gap-7 h-full">
                  {navItems.map((item) => (
                    <li
                      key={item.name}
                      className={`relative h-full flex items-center`}
                      onMouseEnter={() => handleItemMouseEnter(item.name)}
                      onMouseLeave={handleItemMouseLeave}
                    >
                      {item.href === "#" ? (
                        <span className="group relative flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-black transition-colors h-full cursor-default">
                          {item.name}
                          {(item.dropdown || item.megaMenu) && (
                            <ChevronDown
                              size={10}
                              className={`transition-transform duration-300 ${hoveredItem === item.name ? "rotate-180" : ""}`}
                            />
                          )}
                          <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-[#57AD43] group-hover:w-full transition-all duration-500 ease-out" />
                        </span>
                      ) : (
                        <Link
                          href={item.href}
                          className={`group relative flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] transition-all duration-300 text-black h-full`}
                        >
                          {item.name}
                          {(item.dropdown || item.megaMenu) && (
                            <ChevronDown
                              size={10}
                              className={`transition-transform duration-300 ${hoveredItem === item.name ? "rotate-180" : ""}`}
                            />
                          )}
                          <span className={`absolute bottom-[-6px] left-0 h-[2px] bg-[#57AD43] transition-all duration-500 ease-out ${pathname === item.href ? "w-full" : "w-0 group-hover:w-full"}`} />
                        </Link>
                      )}

                      {/* Desktop simple dropdown centered under the item itself */}
                      <AnimatePresence>
                        {hoveredItem === item.name && item.dropdown && (
                          <div
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-[28px] z-[1100]"
                            onMouseEnter={handleDropdownMouseEnter}
                            onMouseLeave={handleDropdownMouseLeave}
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 rounded-2xl min-w-[200px]"
                            >
                              {/* Small heading on top */}
                              <div className="pt-4 px-6 mb-0 text-center">
                                <h3 className="text-[9px] font-black uppercase tracking-[0.18em] text-[#57AD43]">
                                  Studio
                                </h3>
                                <div className="h-[1px] w-full bg-gray-100 mt-1"></div>
                              </div>
                              <ul className="flex flex-col pb-4 pt-0">
                                {item.dropdown.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link
                                      href={subItem.href}
                                      className="block px-6 py-3 text-[12px] font-medium text-gray-400 hover:text-black hover:font-bold hover:bg-black/5 transition-all text-center whitespace-nowrap"
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-3 sm:gap-5">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-gray-600 hover:text-black transition-colors focus:outline-none"
                >
                  <Search size={18} />
                </button>

                <div
                  className="relative"
                  onMouseEnter={() => isLoggedIn && setIsAccountOpen(true)}
                  onMouseLeave={() => setIsAccountOpen(false)}
                >
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        window.location.href = "/api/auth/login";
                      }
                    }}
                    className="text-gray-600 hover:text-black transition-colors flex items-center justify-center h-12 md:h-14 focus:outline-none"
                  >
                    <User size={18} />
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
                          className="flex items-center gap-3 px-6 py-4 text-[11px] font-medium uppercase tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-all border-b border-gray-50"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsAccountOpen(false);
                            window.location.href = "/api/auth/logout";
                          }}
                          className="w-full flex items-center justify-between px-6 py-4 text-[9px] font-medium uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => toggleCart(true)}
                  className="text-gray-600 hover:text-black transition-colors relative focus:outline-none"
                >
                  <ShoppingBag size={18} />
                  {isMounted && itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#57AD43] text-[8px] md:text-[9px] text-white font-black w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center rounded-full">
                      {itemCount}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Button - Moved to the right */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-gray-600 border-l border-gray-100 ml-2 focus:outline-none"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>

              {/* Desktop Mega-Menus positioned in the middle of the navbar */}
              <AnimatePresence>
                {hoveredItem && (
                  (() => {
                    const activeItem = navItems.find(item => item.name === hoveredItem);
                    if (!activeItem || !activeItem.megaMenu) return null;
                    return (
                      <>
                        {/* Global Invisible Hover Bridge */}
                        <div
                          onMouseEnter={handleDropdownMouseEnter}
                          onMouseLeave={handleDropdownMouseLeave}
                          className="absolute top-full left-0 w-full h-[16px] z-[1099] bg-transparent"
                        />
                        <div
                          className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-[1100]"
                          onMouseEnter={handleDropdownMouseEnter}
                          onMouseLeave={handleDropdownMouseLeave}
                        >
                          <motion.div
                            key={activeItem.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 rounded-2xl w-[min(calc(100vw-4rem),1100px)]"
                          >
                            <div className="flex divide-x divide-gray-100 rounded-2xl overflow-hidden">
                              {activeItem.megaMenu.map((category) => (
                                <div
                                  key={category.title}
                                  className="flex flex-col gap-2.5 p-6 flex-1 min-w-0 hover:bg-gray-50/60 transition-colors duration-300"
                                >
                                  <div className="space-y-1">
                                    <Link
                                      href={`/fabrics?category=${category.title.toLowerCase().replace(/ /g, '-')}`}
                                      className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#57AD43] hover:text-black transition-colors flex items-center whitespace-nowrap block"
                                    >
                                      {category.title}
                                    </Link>
                                    <div className="h-[1px] w-full bg-gray-100"></div>
                                  </div>

                                  <ul className="grid gap-y-0.5 grid-cols-1">
                                    {category.items.map((subItem) => (
                                      <li key={subItem}>
                                        <Link
                                          href={`/fabrics?category=${subItem.toLowerCase().replace(/ /g, '-')}`}
                                          className="flex items-center px-3 py-1.5 text-[11px] font-medium text-gray-400 hover:text-[#57AD43] hover:font-bold hover:bg-black/5 rounded-lg transition-all w-full"
                                        >
                                          {subItem}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </>
                    );
                  })()
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed top-[70px] left-1/2 -translate-x-1/2 w-[95%] max-w-[500px] bg-white rounded-3xl shadow-2xl z-[90] md:hidden overflow-hidden"
                >
                  <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                    {/* Mobile Search */}
                    <div className="relative mb-8">
                      <input
                        type="text"
                        placeholder="Search fabrics..."
                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl px-6 text-sm focus:outline-none"
                      />
                      <button className="absolute right-2 top-1 h-10 w-10 flex items-center justify-center bg-black text-white rounded-xl">
                        <Search size={16} />
                      </button>
                    </div>

                    <ul className="space-y-2">
                      {navItems.map((item) => (
                        <li key={item.name} className="border-b border-gray-50 pb-2">
                          <div className="flex items-center justify-between">
                            {item.href === "#" ? (
                              <span
                                className="text-sm font-medium uppercase tracking-[0.1em] py-3 block cursor-pointer flex-1"
                                onClick={() => setActiveAccordion(activeAccordion === item.name ? null : item.name)}
                              >
                                {item.name}
                              </span>
                            ) : (
                              <Link
                                href={item.href}
                                className="text-sm font-medium uppercase tracking-[0.1em] py-3 block flex-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item.name}
                              </Link>
                            )}
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
                                          className="text-xs font-medium text-gray-400 uppercase tracking-widest"
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
                                        <Link
                                          href={`/fabrics?category=${cat.title.toLowerCase().replace(/ /g, '-')}`}
                                          className="text-[12px] font-bold uppercase tracking-widest text-[#57AD43] hover:text-black mb-3 block"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                          {cat.title}
                                        </Link>
                                        <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                                          {cat.items.map((sub) => (
                                            <li key={sub}>
                                              <Link
                                                href={`/fabrics?category=${sub.toLowerCase().replace(/ /g, '-')}`}
                                                className="text-[12px] font-medium text-gray-400"
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
                          <Link href="/orders" className="text-sm font-medium uppercase tracking-widest text-[#57AD43]" onClick={() => setIsMobileMenuOpen(false)}>
                            My Orders
                          </Link>
                          <button onClick={() => { logout(); setIsMobileMenuOpen(false); window.location.href = "/api/auth/logout"; }} className="text-sm font-medium uppercase tracking-widest text-red-500 text-left">
                            Logout
                          </button>
                        </>
                      ) : (
                        <button onClick={() => { window.location.href = "/api/auth/login"; setIsMobileMenuOpen(false); }} className="text-sm font-medium uppercase tracking-widest text-black text-left">
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
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/98 backdrop-blur-md z-[3000] flex flex-col overflow-y-auto"
          >
            <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-8 md:py-12">
              {/* Header with Logo and Close Button */}
              <div className="flex justify-between items-center mb-20 md:mb-32">
                <img
                  src="/logos/logo.png"
                  alt="Texongo"
                  className="h-8 md:h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="group flex items-center gap-3 text-gray-400 hover:text-black transition-all"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] hidden md:block">Close Escape</span>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                    <X size={20} strokeWidth={2.5} />
                  </div>
                </button>
              </div>

              {/* Search Core */}
              <div className="max-w-5xl mx-auto w-full">
                <div className="space-y-4 mb-16 md:mb-24">
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#57AD43]">Explore Texongo</span>
                  <div className="relative flex items-end">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Start typing..."
                      className="w-full text-4xl md:text-7xl lg:text-8xl font-black placeholder:text-gray-100 focus:outline-none bg-transparent pb-6 border-b-[6px] border-gray-50 focus:border-black transition-all duration-700"
                    />
                    <div className="absolute right-0 bottom-8">
                      <Search className="text-gray-200" size={48} strokeWidth={3} />
                    </div>
                  </div>
                </div>

                {/* Suggestions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                  {/* Left Column: Popular Tags */}
                  <div className="lg:col-span-7">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 mb-10 border-l-2 border-[#57AD43] pl-4">Trending Now</h3>
                    <div className="flex flex-wrap gap-4 md:gap-6">
                      {[
                        { name: "Single Jersey", count: "120+" },
                        { name: "French Terry", count: "85" },
                        { name: "Organic Cotton", count: "可持续" },
                        { name: "Rib Knits", count: "New" },
                        { name: "Pique", count: "Classic" },
                        { name: "Supima Blends", count: "Luxury" }
                      ].map((item) => (
                        <Link
                          key={item.name}
                          href={`/fabrics?category=${item.name.toLowerCase().replace(/ /g, '-')}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="group relative flex items-center gap-4 bg-gray-50 hover:bg-black p-4 md:p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-xl"
                        >
                          <div className="flex flex-col">
                            <span className="text-xs md:text-sm font-black uppercase tracking-widest text-gray-900 group-hover:text-white transition-colors">{item.name}</span>
                            <span className="text-[9px] font-bold text-gray-400 group-hover:text-white/50 uppercase tracking-[0.2em]">{item.count} items</span>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white group-hover:bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                            <ChevronRight size={14} className="text-black group-hover:text-white" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Quick Links & Help */}
                  <div className="lg:col-span-5 space-y-16">
                    <div>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 mb-10 border-l-2 border-[#57AD43] pl-4">Quick Navigation</h3>
                      <ul className="space-y-6">
                        {[
                          { name: "Explore New Arrivals", sub: "Latest fabric drops" },
                          { name: "Shop Best Sellers", sub: "Most popular choices" },
                          { name: "Sustainable Collection", sub: "Eco-friendly fabrics" },
                          { name: "3D Digital Studio", sub: "Interactive visualization" }
                        ].map((link) => (
                          <li key={link.name}>
                            <Link
                              href="/fabrics"
                              onClick={() => setIsSearchOpen(false)}
                              className="group flex flex-col gap-1"
                            >
                              <span className="text-xl md:text-2xl font-black text-gray-900 group-hover:text-[#57AD43] transition-colors">{link.name}</span>
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{link.sub}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
