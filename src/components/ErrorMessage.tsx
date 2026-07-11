// src/components/ErrorMessage.tsx
import { AlertCircle, RefreshCw } from "lucide-react";
import { ApiError } from "../lib/api";

interface ErrorMessageProps {
  onRetry: () => void;
  error?: unknown;
  title?: string;
  message?: string;
}

export default function ErrorMessage({
  onRetry,
  error,
  title = "Something went wrong",
  message = "Please try again.",
}: ErrorMessageProps) {
  const errorMessage = error instanceof ApiError ? error.message : message;
  const errorDetails =
    error instanceof Error && !(error instanceof ApiError)
      ? error.message
      : null;

  return (
    <div
      className="card text-center bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
      aria-live="polite"
      role="alert"
    >
      <div className="flex justify-center mb-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/50">
          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-2">
        {title}
      </h3>

      <p className="text-sm text-red-700 dark:text-red-400 mb-4">{errorMessage}</p>

      {errorDetails && process.env.NODE_ENV === "development" && (
        <details className="mb-4 text-sm text-red-600 dark:text-red-400">
          <summary className="cursor-pointer hover:underline">Technical Details</summary>
          <pre className="mt-2 text-left whitespace-pre-wrap text-xs bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
            {errorDetails}
          </pre>
        </details>
      )}

      <button
        onClick={onRetry}
        className="btn btn-primary"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
