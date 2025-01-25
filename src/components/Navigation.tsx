import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Timer, BookOpen, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthDialog } from "@/components/AuthDialog";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navigation() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const NavItems = () => (
    <>
      <NavigationMenuItem>
        <Link to="/timer" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary">
          <Timer className="w-4 h-4 mr-2" />
          Timer
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link to="/skills" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary">
          <BookOpen className="w-4 h-4 mr-2" />
          Skills
        </Link>
      </NavigationMenuItem>
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">SkillForge</span>
          </Link>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavItems />
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="outline" className="hidden sm:flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {user.email?.split('@')[0]}
                </Button>
                <Button onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <AuthDialog mode="signin" />
                <AuthDialog mode="signup" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}