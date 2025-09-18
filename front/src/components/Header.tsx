import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass-morphism border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold gradient-text">Monely</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#recursos" className="text-sm font-medium hover:text-primary transition-colors">
              Recursos
            </a>
            <a href="#precos" className="text-sm font-medium hover:text-primary transition-colors">
              Preços
            </a>
            <a href="#sobre" className="text-sm font-medium hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="#contato" className="text-sm font-medium hover:text-primary transition-colors">
              Contato
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
            <Button size="sm" className="neural-glow">
              Começar Grátis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary/10 py-4 space-y-4">
            <nav className="flex flex-col gap-4">
              <a href="#recursos" className="text-sm font-medium hover:text-primary transition-colors">
                Recursos
              </a>
              <a href="#precos" className="text-sm font-medium hover:text-primary transition-colors">
                Preços
              </a>
              <a href="#sobre" className="text-sm font-medium hover:text-primary transition-colors">
                Sobre
              </a>
              <a href="#contato" className="text-sm font-medium hover:text-primary transition-colors">
                Contato
              </a>
            </nav>
            
            <div className="flex flex-col gap-2 pt-4 border-t border-primary/10">
              <Button variant="ghost" size="sm" className="justify-start">
                Entrar
              </Button>
              <Button size="sm" className="justify-start">
                Começar Grátis
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;