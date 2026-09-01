"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../_lib/supabase";

type AuthValue = { user: User | null; ready: boolean };
const AuthContext = createContext<AuthValue>({ user: null, ready: false });

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Girişsizken login'e, girişliyken login'den dashboard'a yönlendir (UX — güvenlik RLS'te)
  useEffect(() => {
    if (!ready) return;
    const onLogin = pathname?.includes("/learn-english/login");
    if (!user && !onLogin) router.replace("/learn-english/login/");
    if (user && onLogin) router.replace("/learn-english/");
  }, [ready, user, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, ready }}>
      {children}
    </AuthContext.Provider>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
  },
});

export function LearnProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
