import { useState } from "react";
import {
  HashRouter as Router,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Menu, Moon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Toggle } from "@/components/ui/toggle";
import { useAuth } from "@/utils/AuthProvider";

// Links configuration array - you can modify this based on your routes
const links = [
  { label: "Home", route: "/" },
  { label: "About", route: "/about" },
  { label: "Citation", route: "/citation" },
  { label: "Team", route: "/team" },
];

const Navbar = ({ setOpenLoginDialog, setFeedbackMessage }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleNavigation = (route) => {
    navigate(route);
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setFeedbackMessage({
        title: "Success",
        description: "You have been logged out",
      });
    } catch (error) {
      setFeedbackMessage({
        title: "Error",
        description: error.message,
      });
      console.error("Error logging out:", error.message);
    }
    setOpen(false);
  };

  const AuthButtons = () =>
    user ? (
      <div className="flex items-center justify-center">
        <Button onClick={handleLogout} variant="outline">
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <LogOut />
        </Button>
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <Button onClick={() => setOpenLoginDialog(true)} variant="outline">
          Login
          <LogIn className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );

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
                  className={`${navigationMenuTriggerStyle()} ${
                    location.pathname === link.route
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }`}
                >
                  {link.label}
                </Button>
              </NavigationMenuItem>
            ))}
            <div className="flex gap-4 items-center">
              <Toggle
                variant={"outline"}
                aria-label="Toggle italic"
                onClick={() =>
                  document.documentElement.classList.toggle("dark")
                }
              >
                <Moon />
              </Toggle>
              <AuthButtons />
            </div>
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
                  <div className="text-xl font-bold">PHIL331 Project</div>
                </SheetTitle>
                <SheetDescription>Navigation menu</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col items-center gap-4 mt-8">
                {links.map((link) => (
                  <Button
                    key={link.route}
                    variant="ghost"
                    onClick={() => handleNavigation(link.route)}
                    className={`w-3/4 ${
                      location.pathname === link.route
                        ? "bg-accent text-accent-foreground"
                        : ""
                    }`}
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

              <AuthButtons />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
