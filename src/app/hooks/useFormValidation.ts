/**
 * Custom hook for form validation
 * Provides real-time validation and error handling
 */

import { useState, useCallback } from 'react';
import type { ValidationResult } from '../types';

interface UseFormValidationOptions<T> {
  initialValues: T;
  validate: (values: T) => ValidationResult;
  onSubmit: (values: T) => void | Promise<void>;
}

export function useFormValidation<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormValidationOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate single field on blur
    const validation = validate(values);
    if (!validation.valid && validation.errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validation.errors[field],
      }));
    }
  }, [values, validate]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    setIsSubmitting(true);

    // Validate all fields
    const validation = validate(values);

    if (!validation.valid) {
      setErrors(validation.errors);
      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setTouched(allTouched);
      setIsSubmitting(false);
      return false;
    }

    // Clear errors
    setErrors({});

    // Submit form
    try {
      await onSubmit(values);
      setIsSubmitting(false);
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      return false;
    }
  }, [values, validate, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldValue = useCallback((field: string, value: any) => {
    handleChange(field, value);
  }, [handleChange]);

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    hasErrors: Object.keys(errors).length > 0,
  };
}
