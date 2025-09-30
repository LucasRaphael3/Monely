import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`
        relative h-12 w-12 rounded-full 
        bg-white/20 backdrop-blur-md border border-white/30
        hover:bg-white/30 hover:scale-110
        transition-all duration-300 ease-out
        ${className}
      `}
      title={theme === 'light' ? 'Alternar para tema escuro' : 'Alternar para tema claro'}
    >
      <Sun className={`
        h-5 w-5 transition-all duration-300 
        ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}
      `} />
      <Moon className={`
        absolute h-5 w-5 transition-all duration-300
        ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}
      `} />
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
};

export default ThemeToggle;
