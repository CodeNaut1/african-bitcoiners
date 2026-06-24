import { cn } from '@/utilities/ui'
import * as React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  narrow?: boolean
}

const Container: React.FC<ContainerProps> = ({
  as: Tag = 'div',
  narrow = false,
  className,
  children,
  ...props
}) => {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        narrow ? 'max-w-4xl' : 'max-w-7xl',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export { Container }
