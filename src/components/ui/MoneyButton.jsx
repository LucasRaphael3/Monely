import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MoneyButton = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className,
  loading = false,
  ...props 
}) => {
  const variants = {
    default: 'bg-gradient-to-r from-[#00D66A] to-[#00B855] hover:from-[#00B855] hover:to-[#009944] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5',
    outline: 'border-2 border-[#00D66A] text-[#00D66A] hover:bg-[#00D66A] hover:text-white transition-all duration-300',
    ghost: 'text-[#00D66A] hover:bg-[#00D66A]/10 transition-all duration-300',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
  };

  return (
    <Button
      className={cn(
        variants[variant],
        loading && 'pointer-events-none opacity-70',
        className
      )}
      size={size}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </Button>
  );
};

export default MoneyButton;
