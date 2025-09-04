import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, TrendingUp } from "lucide-react";
import heroImage from "@/assets/monely-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary-light/20">
      {/* Neural network background effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-radial from-primary-glow/30 to-transparent animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-gradient-radial from-primary-glow/20 to-transparent animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-3/4 w-28 h-28 rounded-full bg-gradient-radial from-primary-glow/25 to-transparent animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-primary/20">
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">IA Financeira</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="gradient-text">Monely</span>
                <br />
                Gestão Inteligente
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Transforme sua vida financeira com inteligência artificial. 
                Análises preditivas, insights personalizados e automação completa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group neural-glow">
                Começar Grátis
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
                Ver Demonstração
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Precisão IA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">+R$ 2.5k</div>
                <div className="text-sm text-muted-foreground">Economia Média</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50k+</div>
                <div className="text-sm text-muted-foreground">Usuários</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden neural-glow">
              <img 
                src={heroImage} 
                alt="Monely AI Finance Dashboard - Visualização 3D de dados financeiros com IA"
                className="w-full h-auto object-cover"
              />
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 glass-morphism rounded-lg p-3 animate-bounce">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              
              <div className="absolute bottom-4 left-4 glass-morphism rounded-lg p-3 animate-pulse">
                <Brain className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;