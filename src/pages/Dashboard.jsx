import { useAuth } from '@/contexts/AuthContext';
import MoneyLogo from '@/components/ui/MoneyLogo';
import MoneyButton from '@/components/ui/MoneyButton';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  MessageCircle,
  LogOut,
  User
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    {
      title: "Saldo Total",
      value: "R$ 12.847,50",
      change: "+12.5%",
      trend: "up",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: "Gastos do Mês",
      value: "R$ 3.247,80",
      change: "-8.2%",
      trend: "down",
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      title: "Economia",
      value: "R$ 1.520,30",
      change: "+15.3%",
      trend: "up",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <MoneyLogo size="sm" />
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Olá, {user?.name || 'Usuário'}</span>
            </div>
            
            <MoneyButton
              variant="outline"
              size="sm"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </MoneyButton>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo de volta, {user?.name?.split(' ')[0] || 'Usuário'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Aqui está um resumo das suas finanças hoje
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="text-[#00D66A]">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {stat.change} em relação ao mês passado
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* WhatsApp Integration */}
        <Card className="mb-8 bg-gradient-to-r from-[#00D66A]/10 to-[#00B855]/10 border-[#00D66A]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-[#00D66A]" />
              Integração WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Conecte seu WhatsApp para gerenciar suas finanças de forma ainda mais prática
            </p>
            <MoneyButton>
              <MessageCircle className="w-4 h-4 mr-2" />
              Conectar WhatsApp
            </MoneyButton>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <MoneyButton variant="outline" className="w-full justify-start">
                Adicionar Transação
              </MoneyButton>
              <MoneyButton variant="outline" className="w-full justify-start">
                Ver Relatórios
              </MoneyButton>
              <MoneyButton variant="outline" className="w-full justify-start">
                Configurar Metas
              </MoneyButton>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insights da IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">💡 Dica do dia</p>
                  <p className="text-sm">
                    Você gastou 15% menos em delivery este mês. Continue assim!
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">📊 Análise</p>
                  <p className="text-sm">
                    Seus gastos com transporte aumentaram. Considere usar mais o transporte público.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
