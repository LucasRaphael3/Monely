import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const savedUser = localStorage.getItem('monely_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular resposta da API
      const userData = {
        id: 1,
        name: 'Usuário Teste',
        email: email,
        avatar: null
      };
      
      setUser(userData);
      localStorage.setItem('monely_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular resposta da API
      const userData = {
        id: 1,
        name: name,
        email: email,
        avatar: null
      };
      
      setUser(userData);
      localStorage.setItem('monely_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao criar conta' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('monely_user');
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
