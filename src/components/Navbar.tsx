import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import { Button } from "./ui/button";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated] = useState(false); // TODO: Replace with actual auth state

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-background to-background/0 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          StreamFlix
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            {isSearchOpen ? (
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          {isAuthenticated ? (
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="secondary">Sign In</Button>
          )}
        </div>
      </div>
    </nav>
  );
}