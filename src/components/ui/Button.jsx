import React from "react";

export const Button = React.forwardRef(({ className = "", children, style, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`btn-cosmic ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '0.8rem 2rem',
        background: 'rgba(255, 255, 255, 0.03)',
        color: '#fff',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '500',
        cursor: 'pointer',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        if (props.onMouseEnter) props.onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
        if (props.onMouseLeave) props.onMouseLeave(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
