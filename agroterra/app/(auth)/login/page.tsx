"use client"

import { FormEvent } from 'react'
import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import logo from "@/app/favicon.ico"
import Link from "next/link"
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          background: #0a0a08;
          font-family: 'DM Sans', sans-serif;
        }

        /* ─── LEFT PANEL ─── */
        .left-panel {
          width: 52%;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .left-panel { display: none; }
          .right-panel { width: 100% !important; }
        }

        .left-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, #1c2b1c 0%, #0d1a0d 40%, #0a0a08 100%);
        }

        /* Grain texture overlay */
        .left-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.4;
          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px 200px;
          mix-blend-mode: overlay;
          z-index: 1;
        }

        /* Radial glow */
        .left-bg::after {
          content: '';
          position: absolute;
          bottom: -10%;
          left: -10%;
          width: 70%;
          height: 70%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(74, 114, 47, 0.18) 0%, transparent 70%);
          z-index: 0;
        }

        .left-content {
          position: relative;
          z-index: 2;
          padding: 3rem 3.5rem;
        }

        .left-logo {
          position: absolute;
          top: 2.5rem;
          left: 3.5rem;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-mark {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(180, 210, 140, 0.3);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-leaf {
          width: 18px;
          height: 18px;
        }

        .logo-name {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 15px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
        }

        .left-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(3.2rem, 5vw, 4.8rem);
          line-height: 1.05;
          color: #f0ece0;
          letter-spacing: -0.01em;
          margin-bottom: 1.5rem;
        }

        .left-headline em {
          font-style: italic;
          color: #a8c87a;
        }

        .left-tagline {
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        /* Decorative vertical rule */
        .left-rule {
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, transparent, rgba(168, 200, 122, 0.5), transparent);
          margin-bottom: 2rem;
        }

        /* Stats row */
        .left-stats {
          display: flex;
          gap: 2rem;
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .stat-item {}
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 300;
          color: #a8c87a;
          line-height: 1;
        }
        .stat-label {
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-top: 4px;
        }

        /* Decorative corner lines */
        .corner-deco {
          position: absolute;
          top: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          border-top: 1px solid rgba(168, 200, 122, 0.2);
          border-right: 1px solid rgba(168, 200, 122, 0.2);
          z-index: 2;
        }
        .corner-deco-bl {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          border-bottom: 1px solid rgba(168, 200, 122, 0.2);
          border-right: 1px solid rgba(168, 200, 122, 0.2);
          z-index: 2;
        }

        /* ─── RIGHT PANEL ─── */
        .right-panel {
          width: 48%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          background: #0e0e0c;
          position: relative;
        }

        .right-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(168, 200, 122, 0.15) 20%,
            rgba(168, 200, 122, 0.3) 50%,
            rgba(168, 200, 122, 0.15) 80%,
            transparent 100%
          );
        }

        .form-container {
          width: 100%;
          max-width: 360px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .form-container.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        /* Mobile logo */
        .mobile-logo {
          display: none;
          align-items: center;
          gap: 10px;
          margin-bottom: 3rem;
        }
        @media (max-width: 900px) {
          .mobile-logo { display: flex; }
        }

        .form-eyebrow {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a8c87a;
          margin-bottom: 0.75rem;
        }

        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.8rem;
          font-weight: 300;
          color: #f0ece0;
          line-height: 1.1;
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }

        .form-subtitle {
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.35);
          margin-bottom: 2.5rem;
          letter-spacing: 0.01em;
        }

        /* ─── INPUTS ─── */
        .field-group {
          margin-bottom: 1.25rem;
        }

        .field-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .field-label span {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          transition: color 0.2s;
        }

        .field-label span.active {
          color: #a8c87a;
        }

        .field-label a {
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.05em;
          color: rgba(168, 200, 122, 0.6);
          text-decoration: none;
          transition: color 0.2s;
        }
        .field-label a:hover {
          color: #a8c87a;
        }

        .field-input-wrap {
          position: relative;
        }

        .field-input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          color: #f0ece0;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          letter-spacing: 0.02em;
        }

        .field-input::placeholder {
          color: rgba(255,255,255,0.18);
        }

        .field-input:focus {
          border-color: rgba(168, 200, 122, 0.4);
          background: rgba(168, 200, 122, 0.03);
          box-shadow: 0 0 0 3px rgba(168, 200, 122, 0.06);
        }

        /* Animated bottom line */
        .field-line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 0%;
          background: #a8c87a;
          transition: width 0.3s ease;
          border-radius: 0 0 4px 4px;
        }

        .field-input:focus ~ .field-line {
          width: 100%;
        }

        /* ─── ERROR ─── */
        .error-block {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 4px;
          background: rgba(180, 50, 50, 0.08);
          border: 1px solid rgba(180, 50, 50, 0.2);
          margin-bottom: 1.25rem;
        }

        .error-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #e07070;
          flex-shrink: 0;
        }

        .error-text {
          font-size: 12px;
          font-weight: 300;
          color: #e07070;
          letter-spacing: 0.02em;
        }

        /* ─── SUBMIT BUTTON ─── */
        .submit-btn {
          width: 100%;
          padding: 15px;
          margin-top: 0.5rem;
          background: #a8c87a;
          border: none;
          border-radius: 4px;
          color: #0d1a0d;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background 0.25s, transform 0.15s;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.1);
          opacity: 0;
          transition: opacity 0.25s;
        }

        .submit-btn:hover::before {
          opacity: 1;
        }

        .submit-btn:active {
          transform: scale(0.99);
        }

        .submit-btn:disabled {
          background: #5a7040;
          cursor: not-allowed;
          color: rgba(255,255,255,0.4);
        }

        /* Loading spinner */
        .btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 1.5px solid rgba(13, 26, 13, 0.3);
          border-top-color: #0d1a0d;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ─── BOTTOM DIVIDER ─── */
        .form-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 2rem 0 1.5rem;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        .divider-text {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.1em;
        }

        /* Sign-up link */
        .signup-row {
          text-align: center;
          font-size: 12px;
          font-weight: 300;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.04em;
        }

        .signup-row a {
          color: rgba(168, 200, 122, 0.7);
          text-decoration: none;
          border-bottom: 1px solid rgba(168, 200, 122, 0.2);
          padding-bottom: 1px;
          transition: color 0.2s, border-color 0.2s;
        }

        .signup-row a:hover {
          color: #a8c87a;
          border-color: rgba(168, 200, 122, 0.5);
        }
      `}</style>

      <div className="login-root">
        {/* ─── LEFT PANEL ─── */}
        <div className="left-panel">
          <div className="left-bg" />
          <div className="corner-deco" />
          <div className="corner-deco-bl" />

          {/* Logo */}
          <div className="left-logo">
            <div className="logo-mark">
              <Image src={logo} alt='Agroterra Logo' />
            </div>
            <span className="logo-name">Agroterra</span>
          </div>

          {/* Main content */}
          <div className="left-content">
            <div className="left-rule" />
            {/* <h1 className="left-headline">
              A place that<br />
              <em>celebrates</em><br />
              life.
            </h1> */}
            <TypeAnimation
              className="left-headline"
              style={{ whiteSpace: 'pre-line', height: '250px', display: 'block' }}
              sequence={[
                `Welcome to\nAgroterra\nResort`, 
                3000,
                'A place that\ncelebrates\nlife.',
                3000,
                'Sign In\nto see more',
                3000
              ]}
              repeat={Infinity}
            />
            <p className="left-tagline">Rooted in nature. Grown with purpose.</p>

          </div>
        </div>

        {/* ─── RIGHT PANEL ─── */}
        <div className="right-panel">
          <div className={`form-container ${mounted ? 'mounted' : ''}`}>

            {/* Mobile logo */}
            <div className="mobile-logo">
              <div className="logo-mark">
                <Image src={logo} alt='Agroterra Logo' />
              </div>
              <span className="logo-name">Agroterra</span>
            </div>

            <p className="form-eyebrow">Secure access</p>
            <h2 className="form-title">Sign in</h2>
            <p className="form-subtitle">Welcome back to your dashboard</p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="field-group">
                <div className="field-label">
                  <span className={focused === 'email' ? 'active' : ''}>Email</span>
                </div>
                <div className="field-input-wrap">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="field-input"
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                  <div className="field-line" />
                </div>
              </div>

              {/* Password */}
              <div className="field-group">
                <div className="field-label">
                  <span className={focused === 'password' ? 'active' : ''}>Password</span>
                </div>
                <div className="field-input-wrap">
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    className="field-input"
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                  />
                  <div className="field-line" />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="error-block">
                  <div className="error-dot" />
                  <span className="error-text">{error}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                <div className="btn-inner">
                  {loading && <div className="spinner" />}
                  {loading ? "Signing in" : "Continue"}
                </div>
              </button>
            </form>

            <div className="form-divider">
              <div className="divider-line" />
              <span className="divider-text">OR</span>
              <div className="divider-line" />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}