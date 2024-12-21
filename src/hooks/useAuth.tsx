'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

import { FirebaseError } from 'firebase/app';

import Cookie from "js-cookie";
import { auth } from '@/services/firebase';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextProps {
  userLogged: boolean;
  setUserLogged: any;
  loading: boolean;
  user: User | null;
  signIn: (email: string, password: string) => void;
  signOutUser: () => void;
  resetPassword: (email: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("")

  const { toast } = useToast();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      user?.getIdToken(true).then(idToken => {
        Cookie.set("auth-cookie", idToken);
        setToken(idToken)
      })

      setUser(user);
      if (user) {
        setUserLogged(true);
        ;
      };
    });
  }, []);

  async function signIn(email: string, password: string) {
    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUserLogged(true);
    } catch (error) {
      setLoading(false);
      setUser(null);
      setUserLogged(false);

      toast({
        title: "Atenção",
        description: "E-mail ou senha não conferem. Tente novamente.",
      })

      const errorCode = error as FirebaseError;

      if (errorCode.code === "auth/invalid-login-credentials") {
        toast({
          title: "Atenção",
          description: "Senha ou e-mail não conferem.",
        })
        return;
      }

      if (errorCode.message === "INVALID_LOGIN_CREDENTIALS") {
        toast({
          title: "Atenção",
          description: "Senha ou e-mail não conferem.",
        })
        return;
      }

      if (errorCode.code === "auth/user-not-found") {
        toast({
          title: "Atenção",
          description: "E-mail não confere. Tente novamente.",
        })
        return;
      }

      if (errorCode.code === "auth/wrong-password") {
        toast({
          title: "Atenção",
          description: "Senha não confere. Tente novamente.",
        })
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  async function signOutUser() {
    try {
      signOut(auth);
      setUser(null);
      setUserLogged(false);
      Cookie.remove("auth-cookie");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Houve um erro. Entre em contato com o administrador.",
      })
    }
  }

  async function resetPassword(email: string) {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Sucesso!",
        description: "Você recebeu um e-mail para redefinir sua senha. Verifique sua Caixa de Entrada, Spam ou Lixeira.",
      })
    } catch {
      toast({
        title: "Erro",
        description: "Houve um erro. Entre em contato com o administrador.",
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{
      userLogged,
      setUserLogged,
      loading,
      user,
      signIn,
      signOutUser,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}