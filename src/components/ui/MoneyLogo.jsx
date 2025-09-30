import { cn } from '@/lib/utils';

const MoneyLogo = ({ size = 'default', showText = true, className = '' }) => {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-xl' },
    default: { icon: 'w-12 h-12', text: 'text-2xl' },
    lg: { icon: 'w-16 h-16', text: 'text-3xl' },
    xl: { icon: 'w-20 h-20', text: 'text-4xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn(
        'relative rounded-xl bg-gradient-to-br from-[#00D66A] to-[#00B855] flex items-center justify-center shadow-lg',
        'animate-pulse-slow',
        currentSize.icon
      )}>
        {/* Ícone estilizado representando dinheiro/finanças */}
        <div className="relative">
          {/* Símbolo $ estilizado */}
          <div className="text-white font-bold text-lg">$</div>
          {/* Efeito de brilho */}
          <div className="absolute inset-0 bg-white/20 rounded-full blur-sm animate-ping" />
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            'font-bold bg-gradient-to-r from-[#00D66A] to-[#00B855] bg-clip-text text-transparent',
            currentSize.text
          )}>
            Monely
          </h1>
          {size !== 'sm' && (
            <p className="text-sm text-muted-foreground font-medium">
              Gestão Financeira Inteligente
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MoneyLogo;
