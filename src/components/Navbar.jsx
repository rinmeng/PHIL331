import { useState } from "react";
import { HashRouter as Router, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, Moon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Toggle } from "@/components/ui/toggle";

// Links configuration array - you can modify this based on your routes
const links = [
  { label: "Home", route: "/" },
  { label: "Citation", route: "/citation" },
  { label: "Team", route: "/team" },
  { label: "About", route: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
    setOpen(false);
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container justify-between mx-auto">
        <div className="mr-4 md:flex font-bold text-xl">
          <Button
            variant="ghost"
            onClick={() => handleNavigation("/")}
            className="font-bold text-xl"
          >
            PHIL331
          </Button>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.route}>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation(link.route)}
                  className={navigationMenuTriggerStyle()}
                >
                  {link.label}
                </Button>
              </NavigationMenuItem>
            ))}
            <Toggle
              variant={"outline"}
              aria-label="Toggle italic"
              onClick={() => document.documentElement.classList.toggle("dark")}
            >
              <Moon />
            </Toggle>
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

            <SheetContent side="right" className="w-[240px] sm:w-[300px] ">
              <SheetHeader>
                <SheetTitle>
                  <h2 className="text-xl font-bold">PHIL331 Project</h2>
                </SheetTitle>
                <SheetDescription>
                  <p>Navigation menu</p>
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col items-center gap-4 mt-8">
                {links.map((link) => (
                  <Button
                    key={link.route}
                    variant="ghost"
                    onClick={() => handleNavigation(link.route)}
                    className="w-3/4"
                  >
                    {link.label}
                  </Button>
                ))}
              </nav>
              {/* toggle dark/light mode */}
              <div className="flex gap-4 justify-center">
                <Toggle
                  variant={"outline"}
                  aria-label="Toggle italic"
                  onClick={() =>
                    document.documentElement.classList.toggle("dark")
                  }
                >
                  <Moon />
                </Toggle>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
