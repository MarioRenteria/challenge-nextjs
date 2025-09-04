'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  CurrencyConfig,
  DEFAULT_CURRENCY_CONFIG
} from '../../utils/currency';

// Helper functions for currency masking
const formatCurrencyValue = (value: string): string => {
  // Remove all non-digit characters except decimal point
  const cleanValue = value.replace(/[^\d.]/g, '');
  
  // Prevent multiple decimal points
  const parts = cleanValue.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  
  // Limit decimal places to 2
  if (parts[1] && parts[1].length > 2) {
    return parts[0] + '.' + parts[1].substring(0, 2);
  }
  
  return cleanValue;
};

const addThousandsSeparators = (value: string): string => {
  const parts = value.split('.');
  // Add commas to integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

const formatDisplayValue = (value: string, showFormatting: boolean = true): string => {
  if (!value) return '';
  
  const cleanValue = formatCurrencyValue(value);
  if (!cleanValue) return '';
  
  // Show formatting only when not actively editing decimals
  if (showFormatting && !cleanValue.endsWith('.')) {
    return addThousandsSeparators(cleanValue);
  }
  
  return cleanValue;
};

const parseToNumber = (value: string): number => {
  const cleanValue = value.replace(/[^\d.]/g, '');
  return parseFloat(cleanValue) || 0;
};

export interface CurrencyInputProps {
  value: number; // Value in cents
  onChange: (cents: number) => void;
  onBlur?: (cents: number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  config?: CurrencyConfig;
  allowNegative?: boolean;
  showSymbol?: boolean;
  name?: string;
  id?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  onBlur,
  placeholder = '0.00',
  className = '',
  disabled = false,
  required = false,
  min = 0,
  max,
  config = DEFAULT_CURRENCY_CONFIG,
  allowNegative = false,
  showSymbol = true,
  name,
  id
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Update display value when external value changes
  useEffect(() => {
    if (!isFocused) {
      const numericValue = value / 100;
      if (numericValue > 0) {
        const stringValue = numericValue.toString();
        const formatted = formatDisplayValue(stringValue, true);
        setDisplayValue(formatted);
      } else {
        setDisplayValue('');
      }
    }
  }, [value, isFocused]);

  // Handle input change with improved masking
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Handle empty input
    if (inputValue === '') {
      setDisplayValue('');
      onChange(0);
      return;
    }
    
    // Apply currency formatting
    const formattedValue = formatCurrencyValue(inputValue);
    
    // Handle special case for lone decimal point
    if (formattedValue === '.') {
      setDisplayValue('0.');
      return;
    }
    
    // If no valid value after formatting, don't update
    if (!formattedValue) {
      return;
    }
    
    // Parse to number for validation
    const numericValue = parseToNumber(formattedValue);
    const cents = Math.round(numericValue * 100);
    
    // Validate range constraints
    if (min !== undefined && cents < min) {
      return;
    }
    if (max !== undefined && cents > max) {
      return;
    }
    if (!allowNegative && cents < 0) {
      return;
    }
    
    // Determine display format based on editing state
    const isEditingDecimals = isFocused && (
      formattedValue.endsWith('.') || 
      (formattedValue.includes('.') && formattedValue.split('.')[1]?.length <= 2)
    );
    
    if (isEditingDecimals) {
      // Show raw value during decimal editing
      setDisplayValue(formattedValue);
    } else {
      // Show formatted value with thousands separators
      const displayValue = formatDisplayValue(formattedValue, !isFocused);
      setDisplayValue(displayValue);
    }
    
    onChange(cents);
  }, [onChange, min, max, allowNegative, isFocused]);

  // Handle focus
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    // Convert formatted display to raw numeric value for easier editing
    if (value > 0) {
      const numericValue = (value / 100).toString();
      const cleanValue = formatCurrencyValue(numericValue);
      setDisplayValue(cleanValue);
      // Select all text for easy replacement
      setTimeout(() => {
        e.target.select();
      }, 0);
    } else {
      setDisplayValue('');
    }
  }, [value]);

  // Handle blur
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    
    const inputValue = e.target.value;
    if (inputValue === '') {
      setDisplayValue('');
      onChange(0);
      onBlur?.(0);
      return;
    }

    // Apply final formatting and validation
    const formattedValue = formatCurrencyValue(inputValue);
    const numericValue = parseToNumber(formattedValue);
    let cents = Math.round(numericValue * 100);
    
    // Apply range constraints
    if (min !== undefined && cents < min) {
      cents = min;
    }
    if (max !== undefined && cents > max) {
      cents = max;
    }
    if (!allowNegative && cents < 0) {
      cents = 0;
    }

    // Display final formatted value with thousands separators
    const finalNumericValue = cents / 100;
    const finalFormattedValue = formatDisplayValue(finalNumericValue.toString(), true);
    setDisplayValue(finalFormattedValue);
    onChange(cents);
    onBlur?.(cents);
  }, [onChange, onBlur, min, max, allowNegative]);

  // Handle key down for special keys
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
    if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      return;
    }
    
    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) {
      return;
    }
    
    // Allow: numbers, decimal point
    if (/^[0-9.]$/.test(e.key)) {
      return;
    }
    
    // Block everything else
    e.preventDefault();
  }, []);

  // Handle paste
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    
    // Apply currency formatting to pasted content
    const formattedValue = formatCurrencyValue(pastedText);
    
    if (!formattedValue) {
      return;
    }
    
    const numericValue = parseToNumber(formattedValue);
    const cents = Math.round(numericValue * 100);
    
    // Validate range constraints
    if (min !== undefined && cents < min) {
      return;
    }
    if (max !== undefined && cents > max) {
      return;
    }
    if (!allowNegative && cents < 0) {
      return;
    }
    
    // Determine display format
    const parts = formattedValue.split('.');
    const isEditingDecimals = isFocused && (
      formattedValue.endsWith('.') || 
      (parts[1] && parts[1].length <= 2)
    );
    
    if (isEditingDecimals) {
      setDisplayValue(formattedValue);
    } else {
      const displayValue = formatDisplayValue(formattedValue, !isFocused);
      setDisplayValue(displayValue);
    }
    
    onChange(cents);
  }, [onChange, min, max, allowNegative, isFocused]);

  const baseClassName = `
    w-full px-4 py-3 border border-gray-200 rounded-xl 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
    focus:bg-white focus:text-gray-900 
    transition-[background-color,border-color,box-shadow] duration-200 
    bg-white/50 text-gray-800 font-medium
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  return (
    <div className="relative">
      {showSymbol && config.symbolPosition === 'before' && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
          {config.symbol}
        </div>
      )}
      <input
        type="text"
        name={name}
        id={id}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={baseClassName}
        style={{ 
          paddingLeft: showSymbol && config.symbolPosition === 'before' ? '2rem' : undefined,
          paddingRight: showSymbol && config.symbolPosition === 'after' ? '2rem' : undefined
        }}
      />
      {showSymbol && config.symbolPosition === 'after' && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
          {config.symbol}
        </div>
      )}
    </div>
  );
};

export default CurrencyInput;
