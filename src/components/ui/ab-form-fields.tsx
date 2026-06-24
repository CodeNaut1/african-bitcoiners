import { cn } from '@/utilities/ui'
import * as React from 'react'

// Shared focus ring and border style for all AB form fields
const fieldBase =
  'w-full rounded-lg border border-[#d4d4d4] bg-white px-4 py-3 text-brand-text-dark placeholder:text-brand-text-muted text-sm transition-colors focus:outline-none focus:border-brand-primary disabled:opacity-50 disabled:cursor-not-allowed'

export interface ABInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const ABInput: React.FC<ABInputProps> = ({ label, error, className, id, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-brand-text-dark">
          {label}
        </label>
      )}
      <input id={id} className={cn(fieldBase, error && 'border-red-500', className)} {...props} />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

export interface ABTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const ABTextarea: React.FC<ABTextareaProps> = ({ label, error, className, id, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-brand-text-dark">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(fieldBase, 'min-h-28 resize-y', error && 'border-red-500', className)}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

export interface ABSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  placeholder?: string
  options?: { value: string; label: string }[]
}

const ABSelect: React.FC<ABSelectProps> = ({
  label,
  error,
  placeholder,
  options,
  children,
  className,
  id,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-brand-text-dark">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(fieldBase, 'appearance-none cursor-pointer', error && 'border-red-500', className)}
        {...props}
      >
        {children
          ? children
          : (
            <>
              {placeholder && <option value="" disabled>{placeholder}</option>}
              {options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </>
          )}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

export { ABInput, ABTextarea, ABSelect }
