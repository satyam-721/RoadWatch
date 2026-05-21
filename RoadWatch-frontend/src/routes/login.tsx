import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useState } from "react";
import { Phone, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const nav = useNavigate();
  const [mobile, setMobile] = useState("");
  const [pwd, setPwd] = useState("");
  return (
    <PageShell showBottomNav={false} showTopAuth>
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl bg-white border border-border p-6 sm:p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-foreground">Login</h1>
          <p className="text-sm text-muted-foreground">Enter your mobile number to continue.</p>

          <form
            className="mt-6 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/dashboard" });
            }}
          >
            <div>
              <label className="block text-base font-semibold text-foreground mb-2">
                Mobile Number
              </label>
              <div className="flex items-center rounded-2xl border-2 border-input bg-white focus-within:border-primary">
                <span className="pl-4 text-muted-foreground">
                  <Phone className="h-5 w-5" />
                </span>
                <input
                  inputMode="numeric"
                  maxLength={10}
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-transparent px-3 py-4 text-lg outline-none"
                  placeholder="10 digit mobile"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-foreground mb-2">Password</label>
              <div className="flex items-center rounded-2xl border-2 border-input bg-white focus-within:border-primary">
                <span className="pl-4 text-muted-foreground">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  type="password"
                  required
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className="w-full bg-transparent px-3 py-4 text-lg outline-none"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-primary py-4 text-lg font-bold text-primary-foreground"
            >
              Login
            </button>

            <button
              type="button"
              className="w-full text-center text-primary font-semibold py-2"
            >
              Forgot Password?
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Register
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}