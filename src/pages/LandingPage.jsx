import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Brain, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  BarChart3,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Zap,
  Target,
  Users
} from 'lucide-react';
import MoneyLogo from '@/components/ui/MoneyLogo';
import MoneyButton from '@/components/ui/MoneyButton';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "IA Avançada",
      description: "Análise inteligente dos seus gastos com insights personalizados e recomendações precisas."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Integração WhatsApp",
      description: "Gerencie suas finanças diretamente pelo WhatsApp com comandos simples e naturais."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Relatórios Inteligentes",
      description: "Visualize seus dados financeiros com gráficos interativos e relatórios detalhados."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Segurança Total",
      description: "Seus dados estão protegidos com criptografia de ponta e padrões bancários de segurança."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Multiplataforma",
      description: "Acesse suas finanças em qualquer dispositivo, a qualquer hora, em qualquer lugar."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Análise Preditiva",
      description: "Previsões inteligentes para ajudar você a tomar melhores decisões financeiras."
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empresária",
      content: "O Monely revolucionou como eu gerencio minhas finanças. A integração com WhatsApp é fantástica!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Freelancer",
      content: "Nunca foi tão fácil controlar meus gastos. A IA do Monely me ajuda a economizar todo mês.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Estudante",
      content: "Interface intuitiva e recursos incríveis. Recomendo para todos que querem organizar a vida financeira.",
      rating: 5
    }
  ];

  const stats = [
    { number: "50K+", label: "Usuários Ativos" },
    { number: "R$ 2M+", label: "Economizados" },
    { number: "98%", label: "Satisfação" },
    { number: "24/7", label: "Suporte" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <MoneyLogo size="sm" />
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-[#00D66A] transition-colors">
              Recursos
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-[#00D66A] transition-colors">
              Depoimentos
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-[#00D66A] transition-colors">
              Preços
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login">
              <MoneyButton variant="outline" size="sm">
                Entrar
              </MoneyButton>
            </Link>
            <Link to="/register">
              <MoneyButton size="sm">
                Começar Grátis
              </MoneyButton>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00D66A] to-[#00B855] bg-clip-text text-transparent">
              Seu Assistente
              <br />
              Financeiro Inteligente
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Gerencie suas finanças com o poder da Inteligência Artificial. 
              Controle total pelo WhatsApp, insights personalizados e decisões mais inteligentes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/register">
                <MoneyButton size="lg" className="text-lg px-8 py-4">
                  <Zap className="w-5 h-5 mr-2" />
                  Começar Gratuitamente
                </MoneyButton>
              </Link>
              
              <MoneyButton variant="outline" size="lg" className="text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Ver Demonstração
              </MoneyButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-[#00D66A] mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recursos Poderosos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra como o Monely pode transformar sua relação com o dinheiro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="text-[#00D66A] mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Integration Highlight */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Controle Total pelo 
                <span className="text-[#00D66A]"> WhatsApp</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Gerencie suas finanças de forma natural e intuitiva. 
                Envie comandos por voz ou texto e receba insights instantâneos.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Consulte saldo e extratos por mensagem",
                  "Categorize gastos automaticamente",
                  "Receba alertas personalizados",
                  "Análise de gastos por comando de voz"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00D66A]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <MoneyButton size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Conectar WhatsApp
              </MoneyButton>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#00D66A] to-[#00B855] rounded-2xl p-8 text-white">
                <div className="space-y-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm opacity-80">Você</p>
                    <p>Quanto gastei este mês?</p>
                  </div>
                  <div className="bg-white/30 rounded-lg p-4 ml-8">
                    <p className="text-sm opacity-80">Monely IA</p>
                    <p>Você gastou R$ 2.847 este mês. Isso é 15% menos que o mês passado! 🎉</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm opacity-80">Você</p>
                    <p>Onde posso economizar?</p>
                  </div>
                  <div className="bg-white/30 rounded-lg p-4 ml-8">
                    <p className="text-sm opacity-80">Monely IA</p>
                    <p>Identifiquei R$ 340 em gastos com delivery. Que tal cozinhar mais em casa? 👨‍🍳</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">O que nossos usuários dizem</h2>
            <p className="text-xl text-muted-foreground">
              Milhares de pessoas já transformaram suas finanças com o Monely
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#00D66A] text-[#00D66A]" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para transformar suas finanças?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se a milhares de usuários que já descobriram o poder da gestão financeira inteligente
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <MoneyButton size="lg" className="text-lg px-8 py-4">
                  <Target className="w-5 h-5 mr-2" />
                  Começar Agora - Grátis
                </MoneyButton>
              </Link>
              
              <MoneyButton variant="outline" size="lg" className="text-lg px-8 py-4">
                <Users className="w-5 h-5 mr-2" />
                Falar com Especialista
              </MoneyButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <MoneyLogo size="sm" className="mb-4" />
              <p className="text-muted-foreground">
                Transformando a gestão financeira com inteligência artificial e simplicidade.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Recursos</p>
                <p>Preços</p>
                <p>Segurança</p>
                <p>API</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Sobre</p>
                <p>Blog</p>
                <p>Carreiras</p>
                <p>Contato</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Central de Ajuda</p>
                <p>Documentação</p>
                <p>Status</p>
                <p>Comunidade</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Monely. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
