/**
 * Beautiful validation alert component
 */

import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ValidationAlertProps {
  type: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  message: string;
  errors?: { [key: string]: string };
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  className?: string;
}

export function ValidationAlert({
  type,
  title,
  message,
  errors,
  onClose,
  autoClose = false,
  autoCloseDelay = 5000,
  className = '',
}: ValidationAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  if (!isVisible) return null;

  const config = {
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      iconColor: 'text-red-500',
      titleColor: 'text-red-800',
      textColor: 'text-red-700',
      Icon: AlertCircle,
    },
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      iconColor: 'text-green-500',
      titleColor: 'text-green-800',
      textColor: 'text-green-700',
      Icon: CheckCircle,
    },
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      iconColor: 'text-yellow-500',
      titleColor: 'text-yellow-800',
      textColor: 'text-yellow-700',
      Icon: AlertTriangle,
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      iconColor: 'text-blue-500',
      titleColor: 'text-blue-800',
      textColor: 'text-blue-700',
      Icon: Info,
    },
  };

  const { bgColor, borderColor, iconColor, titleColor, textColor, Icon } = config[type];

  return (
    <div
      className={`${bgColor} border-l-4 ${borderColor} p-3 lg:p-4 rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2 ${className}`}
    >
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={`${titleColor} font-semibold mb-1 text-sm lg:text-base`}>
            {title}
          </h4>
        )}
        <p className={`${textColor} text-xs lg:text-sm`}>{message}</p>

        {/* Show error list if provided */}
        {errors && Object.keys(errors).length > 0 && (
          <ul className={`mt-2 space-y-1 ${textColor} text-xs lg:text-sm list-disc list-inside`}>
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>{error}</li>
            ))}
          </ul>
        )}
      </div>
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className={`${iconColor} hover:opacity-70 flex-shrink-0 transition-opacity`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// Inline field error component
interface FieldErrorProps {
  error?: string;
  show?: boolean;
}

export function FieldError({ error, show = true }: FieldErrorProps) {
  if (!error || !show) return null;

  return (
    <p className="text-red-500 text-xs lg:text-sm mt-1 flex items-center gap-1 animate-in slide-in-from-top-1">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      <span>{error}</span>
    </p>
  );
}

// Success message component
interface SuccessMessageProps {
  message: string;
  onClose?: () => void;
}

export function SuccessMessage({ message, onClose }: SuccessMessageProps) {
  return (
    <ValidationAlert
      type="success"
      title="¡Éxito!"
      message={message}
      onClose={onClose}
      autoClose
      autoCloseDelay={3000}
    />
  );
}
