import { useState } from "react";
import { HashRouter as Router, NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Links configuration array - you can modify this based on your routes
const links = [
  { label: "Home", route: "/" },
  { label: "Citation", route: "/citation" },
  { label: "Team", route: "/team" },
  { label: "About", route: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="mr-4 md:flex font-bold text-xl">
          <NavLink to="/" className="flex items-center">
            PHIL331
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.route}>
                <NavLink to={link.route}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </NavigationMenuLink>
                </NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div className="flex md:hidden ml-auto">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {links.map((link) => (
                  <NavLink
                    key={link.route}
                    to={link.route}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-2 py-1 rounded-md ${
                        isActive ? "bg-muted font-medium" : "hover:bg-muted/50"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
