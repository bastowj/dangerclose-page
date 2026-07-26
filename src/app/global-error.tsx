"use client";

import { useEffect } from "react";

import "./globals.css";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Replaces the root layout entirely, so it must render <html> and <body>.
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="main-content-wrapper text-center">
          <h1 className="not-found-title">Something went wrong</h1>
          <p className="not-found-message text-muted">
            The application failed to load. Please try again.
          </p>
          <button type="button" className="btn-primary" onClick={reset}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
