import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const abButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-brand-primary text-white hover:bg-brand-secondary rounded-btn',
        secondary:
          'border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white rounded-btn',
        white: 'bg-white text-brand-secondary hover:bg-brand-cream rounded-btn',
        orange:
          'bg-brand-accent text-white hover:bg-brand-secondary rounded-btn',
        outline:
          'border-2 border-white text-white hover:bg-white/15 rounded-btn',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-5 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  },
)

export interface ABButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof abButtonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const ABButton: React.FC<ABButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  icon,
  iconPosition = 'right',
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp className={cn(abButtonVariants({ variant, size, className }))} {...props}>
      {asChild ? (
        children
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </Comp>
  )
}

export { ABButton, abButtonVariants }
