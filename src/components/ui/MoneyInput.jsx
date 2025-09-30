import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

const MoneyInput = ({ 
  label, 
  type = 'text', 
  error, 
  className,
  showPasswordToggle = false,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : type;

  const handleInputChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type={inputType}
          className={cn(
            'peer h-12 px-4 pt-6 pb-2 border-2 rounded-xl transition-all duration-300',
            'focus:border-[#00D66A] focus:ring-4 focus:ring-[#00D66A]/10',
            'hover:border-gray-400 dark:hover:border-gray-500',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
            className
          )}
          placeholder=" "
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleInputChange}
          {...props}
        />
        
        {label && (
          <label className={cn(
            'absolute left-4 transition-all duration-300 pointer-events-none',
            'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base',
            'peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#00D66A]',
            'top-2 text-xs',
            (isFocused || hasValue || props.value) && 'top-2 text-xs text-[#00D66A]',
            error && 'text-red-500'
          )}>
            {label}
          </label>
        )}

        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00D66A] transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500 animate-in slide-in-from-top-1 duration-300">
          {error}
        </p>
      )}
    </div>
  );
};

export default MoneyInput;
