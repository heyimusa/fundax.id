
import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import FundaxLogo from './FundaxLogo';
import { useIsMobile } from '../hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { to: "/produk", label: "Produk" },
  { to: "/fundax-advisor", label: "Fundax Advisor" },
  { to: "/kalkulator", label: "Kalkulator" },
  { to: "/why-fundax", label: "Why Fundax" },
  { to: "/bisnis", label: "Bisnis" },
  { to: "/berita", label: "Berita" },
  { to: "/tentang-kami", label: "Tentang Kami" },
];

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="w-full h-auto min-h-[70px] sm:h-[84px] bg-white flex items-center px-4 sm:px-6 md:px-8 lg:px-12 justify-between border-b border-[#E5E7EB]">
      <Link to="/" className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] flex items-center">
        <FundaxLogo />
      </Link>
      
      <div className="hidden lg:flex items-center gap-9">
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.to}>
                <Link to={link.to} className="text-fundax-grayText text-sm px-2 py-2 hover:text-fundax-blue">
                  {link.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="lg:hidden flex items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="p-2" onClick={() => setIsOpen(true)} aria-label="Open menu">
              <Menu className="text-xl text-gray-600" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] sm:w-[350px] pt-12 z-50">
            <div className="flex flex-col gap-6">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-fundax-grayText text-lg font-medium px-2 py-2 border-b border-gray-100 hover:text-fundax-blue"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
