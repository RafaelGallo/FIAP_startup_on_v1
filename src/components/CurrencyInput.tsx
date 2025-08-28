import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { formatCurrencyInput } from '../utils/currency';

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function CurrencyInput({ 
  label, 
  value, 
  onChange, 
  placeholder = "R$ 0,00", 
  error,
  required = false 
}: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatCurrencyInput(inputValue);
    onChange(formattedValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={label}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={error ? "border-destructive" : ""}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}