import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, Shield, Smartphone, BarChart3, Target } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "IA Preditiva",
    description: "Algoritmos avançados analisam seus padrões de gastos e preveem tendências futuras com 98% de precisão."
  },
  {
    icon: TrendingUp,
    title: "Análise Inteligente",
    description: "Insights personalizados sobre seus hábitos financeiros com recomendações automáticas para otimização."
  },
  {
    icon: Shield,
    title: "Segurança Máxima", 
    description: "Criptografia bancária e autenticação biométrica protegem seus dados com os mais altos padrões de segurança."
  },
  {
    icon: Smartphone,
    title: "App Intuitivo",
    description: "Interface elegante e intuitiva que torna a gestão financeira simples e prazerosa no seu smartphone."
  },
  {
    icon: BarChart3,
    title: "Relatórios Avançados",
    description: "Dashboards interativos com visualizações em tempo real de todos os seus investimentos e gastos."
  },
  {
    icon: Target,
    title: "Metas Inteligentes",
    description: "Sistema adaptativo de metas que se ajusta automaticamente baseado no seu comportamento financeiro."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Recursos</span> Revolucionários
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experimente o futuro da gestão financeira com tecnologia de ponta 
            que transforma dados em decisões inteligentes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 glass-morphism hover:shadow-lg transition-all duration-300 group cursor-pointer border-primary/10 hover:border-primary/30"
            >
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;