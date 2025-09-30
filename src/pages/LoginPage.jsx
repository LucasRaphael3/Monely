import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MoneyLogo from '@/components/ui/MoneyLogo';
import MoneyButton from '@/components/ui/MoneyButton';
import MoneyInput from '@/components/ui/MoneyInput';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Chrome, Apple, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ general: result.error || 'Erro ao fazer login' });
      }
    } catch (error) {
      setErrors({ general: 'Erro inesperado. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSocialLogin = (provider) => {
    // Implementar login social
    console.log(`Login com ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00D66A]/10 via-background to-[#00B855]/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00D66A]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00B855]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#009944]/5 rounded-full blur-2xl animate-bounce" />
      </div>

      {/* Theme Toggle */}
      <ThemeToggle className="absolute top-6 right-6 z-10" />

      {/* Back to Home */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-muted-foreground hover:text-[#00D66A] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Voltar ao início</span>
      </Link>

      {/* Login Card */}
      <Card className={`
        w-full max-w-md relative z-10 backdrop-blur-sm bg-card/95 border-border/50 shadow-2xl
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
      `}>
        <CardContent className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <MoneyLogo size="default" className="justify-center mb-4" />
            <p className="text-muted-foreground">
              Entre na sua conta para continuar
            </p>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm text-center">{errors.general}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <MoneyInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={errors.email}
              autoComplete="email"
            />

            <MoneyInput
              label="Senha"
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={errors.password}
              showPasswordToggle
              autoComplete="current-password"
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, rememberMe: checked }))
                  }
                />
                <label 
                  htmlFor="remember" 
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Lembrar de mim
                </label>
              </div>
              
              <Link 
                to="/forgot-password" 
                className="text-sm text-[#00D66A] hover:text-[#00B855] transition-colors"
              >
                Esqueci minha senha
              </Link>
            </div>

            {/* Login Button */}
            <MoneyButton
              type="submit"
              className="w-full"
              size="lg"
              loading={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </MoneyButton>
          </form>

          {/* Divider */}
          <div className="my-6">
            <Separator className="relative">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-sm text-muted-foreground">
                ou continue com
              </span>
            </Separator>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <MoneyButton
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              className="w-full"
            >
              <Chrome className="w-4 h-4 mr-2" />
              Google
            </MoneyButton>
            
            <MoneyButton
              variant="outline"
              onClick={() => handleSocialLogin('apple')}
              className="w-full"
            >
              <Apple className="w-4 h-4 mr-2" />
              Apple
            </MoneyButton>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Não tem uma conta?{' '}
              <Link 
                to="/register" 
                className="text-[#00D66A] hover:text-[#00B855] font-medium transition-colors"
              >
                Criar conta gratuita
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#00D66A] rounded-full animate-ping opacity-60" />
        <div className="absolute bottom-32 right-16 w-3 h-3 bg-[#00B855] rounded-full animate-pulse opacity-40" />
        <div className="absolute top-1/2 right-8 w-1 h-1 bg-[#009944] rounded-full animate-bounce opacity-80" />
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-[#00D66A] rounded-full animate-ping delay-500 opacity-50" />
      </div>
    </div>
  );
};

export default LoginPage;
