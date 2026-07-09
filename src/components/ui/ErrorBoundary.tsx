"use client";

import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-dvh flex items-center justify-center bg-paper text-ink px-6">
          <div className="text-center max-w-md">
            <span className="font-mono text-signal text-xs uppercase tracking-[0.2em]">Error</span>
            <h1 className="text-display text-4xl md:text-5xl tracking-tight mt-4">Something went wrong</h1>
            <p className="mt-4 text-ink/60 text-sm">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-8 px-6 py-3 bg-signal text-ink text-sm font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
