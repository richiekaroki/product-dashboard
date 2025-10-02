// src/components/ErrorMessage.tsx (Enhanced version)
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
  // Extract error details if it's an ApiError
  const errorMessage = error instanceof ApiError ? error.message : message;

  const errorDetails =
    error instanceof Error && !(error instanceof ApiError)
      ? error.message
      : null;

  return (
    <div
      className="card text-center bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      aria-live="polite"
      role="alert"
    >
      {/* Error Icon */}
      <div className="flex justify-center mb-3">
        <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
      </div>

      {/* Error Title */}
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
        {title}
      </h3>

      {/* Error Message */}
      <p className="text-red-600 dark:text-red-400 mb-3">{errorMessage}</p>

      {/* Technical Details (for development) */}
      {errorDetails && process.env.NODE_ENV === "development" && (
        <details className="mb-3 text-sm text-red-500 dark:text-red-400">
          <summary className="cursor-pointer">Technical Details</summary>
          <pre className="mt-2 text-left whitespace-pre-wrap">
            {errorDetails}
          </pre>
        </details>
      )}

      {/* Retry Button */}
      <button
        onClick={onRetry}
        className="btn bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 flex items-center justify-center gap-2 mx-auto"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
