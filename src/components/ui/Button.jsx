import React from "react";

export const Button = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`btn-primary ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        background: 'var(--vibrant-coral)',
        color: '#fff',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        transition: 'all 0.3s ease',
        ...props.style
      }}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
