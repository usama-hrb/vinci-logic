"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../../lib/supabase/server-client";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, LogIn } from "lucide-react";

export default function AdminLoginDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
        <div
        className="
          pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%]
          bg-[radial-gradient(var(--color-border)_1px,transparent_1px)]
          bg-size-[16px_16px]
          mask-[linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]
        "
      />
        
      {/* Header */}
      <div className="border-b-3 border-primary bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-8">
          <Logo />
          <ThemeToggle />
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm backdrop-blur-xl bg-primary/2 dark:bg-primary/3 border-2 border-border rounded-xl p-8 shadow-xl">
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-xl font-bold">Admin Login</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to access the admin panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-primary/3 backdrop-blur-sm focus:outline-none focus:ring focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-primary/3 backdrop-blur-sm focus:outline-none focus:ring focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full shadow-lg"
              size="lg"
            >
              <LogIn className="mr-2 h-4 w-4" />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground/60 mt-6">
            Protected area • Authorized access only
          </p>
        </div>
      </div>
    </div>
  );
}
