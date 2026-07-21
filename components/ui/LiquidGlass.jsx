'use client';

/**
 * @typedef {Object} LiquidGlassProps
 * @property {React.ReactNode} children
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 * @property {'div'|'button'|'a'} [as]
 * @property {Function} [onClick]
 * @property {React.MouseEventHandler} [onMouseEnter]
 * @property {React.MouseEventHandler} [onMouseLeave]
 * @property {string} [href]
 * @property {string} ['data-cursor-label']
 */

export function LiquidGlass({
  children,
  className = '',
  style = {},
  as: Component = 'div',
  onClick,
  onMouseEnter,
  onMouseLeave,
  href,
  'data-cursor-label': cursorLabel,
}) {
  const Tag = href ? 'a' : Component;

  const baseStyles = {
    background: 'rgba(255, 255, 255, 0.01)',
    backgroundBlendMode: 'luminosity',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    border: 'none',
    boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    ...style,
  };

  return (
    <Tag
      className={className}
      style={baseStyles}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={href}
      data-cursor-label={cursorLabel}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '1.4px',
          background: 'linear-gradient(180deg, rgba(77,232,212,0.45) 0%, rgba(77,232,212,0.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(77,232,212,0.15) 80%, rgba(77,232,212,0.45) 100%)',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          content: '""',
        }}
        aria-hidden="true"
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </Tag>
  );
}

export function LiquidGlassPill({ children, className = '', ...props }) {
  return (
    <LiquidGlass
      className={`rounded-full px-6 py-3 ${className}`}
      {...props}
    >
      {children}
    </LiquidGlass>
  );
}

export function LiquidGlassCircle({ children, className = '', size = 44, ...props }) {
  return (
    <LiquidGlass
      className={`rounded-full flex items-center justify-center ${className}`}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      {children}
    </LiquidGlass>
  );
}