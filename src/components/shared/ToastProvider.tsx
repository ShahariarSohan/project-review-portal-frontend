"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      gutter={8}
      toastOptions={{
        duration: 3500,
        style: {
          background: "#0f172a",
          color: "#f8fafc",
          fontSize: "13px",
          fontFamily: "var(--font-jakarta), sans-serif",
          borderRadius: "10px",
          border: "1px solid #1e293b",
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.15)",
          padding: "10px 16px",
          fontWeight: 500,
        },
        success: {
          duration: 3500,
          iconTheme: {
            primary: "#10b981",
            secondary: "#ffffff",
          },
        },
        error: {
          duration: 4500,
          iconTheme: {
            primary: "#f43f5e",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
