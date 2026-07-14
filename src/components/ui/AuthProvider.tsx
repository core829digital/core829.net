"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { setSessionToken } from "@/lib/cookie";

interface AuthState {
  token: string;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({ token: "", loading: true });

export function useSession() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ token: "", loading: true });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/token")
      .then((r) => r.json())
      .then((data: { token: string | null }) => {
        if (cancelled) return;
        const token = data.token ?? "";
        setSessionToken(token);
        setState({ token, loading: false });
      })
      .catch(() => {
        if (!cancelled) setState({ token: "", loading: false });
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}
