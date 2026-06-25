import { Toaster } from "sonner";

interface ToastProps {
  dark: boolean;
}

/**
 * Wraps sonner's Toaster with app-consistent styling.
 * Call toast() from sonner anywhere in the tree to trigger a notification.
 */
export default function Toast({ dark }: ToastProps) {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: dark ? "#231A0E" : "#ffffff",
          color: dark ? "#F5EDE0" : "#1C1008",
          border: "1px solid",
          borderColor: dark ? "rgba(249,115,22,0.15)" : "rgba(249,115,22,0.15)",
          borderRadius: "12px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "14px",
          fontWeight: 600,
        },
      }}
    />
  );
}
