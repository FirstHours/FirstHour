import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full text-left">
        {label && (
          <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-[10px] border bg-[#FFFFFF] px-4 py-3 text-[14px] text-text-primary transition-all duration-200 placeholder:text-text-muted/60 focus:outline-none focus:ring-4 shadow-sm",
            error 
              ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/10" 
              : "border-[rgba(139,154,110,0.35)] focus:border-palette-sage focus:ring-palette-sage/20 hover:border-palette-sage/60",
            className
          )}
          {...props}
        />
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              className="mt-1.5 text-[12px] font-medium text-red-600"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Input.displayName = 'Input';
