import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";
import SignInDialog from "./auth/SignInDialog";
import UserMenu from "./auth/UserMenu";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  // Handle navbar background opacity on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 550);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 py-3
        ${isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-md" 
          : "bg-gradient-to-b from-background/90 to-background/0"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className={`text-2xl font-bold transition-colors duration-300
            ${isScrolled 
              ? "text-primary" 
              : "text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
            }`}
        >
          Junglee.Moviez
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            {isSearchOpen ? (
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className={`hover:bg-background/20 
                  ${isScrolled 
                    ? "text-foreground" 
                    : "text-primary shadow-sm hover:text-primary"
                  }`}
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          {user ? (
            <UserMenu />
          ) : (
            <Button 
              variant="secondary"
              className={`font-medium shadow-sm
                ${isScrolled 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-primary/90 text-primary-foreground hover:bg-primary"
                }`}
              onClick={() => setIsSignInOpen(true)}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      <SignInDialog 
        open={isSignInOpen} 
        onOpenChange={setIsSignInOpen}
      />
    </nav>
  );
}