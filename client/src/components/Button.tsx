type ButtonProps = {
  size?: "small" | "medium" | "large";
  variation?: "icon" | "login" | "logout";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  small: "text-xs px-2 py-1 font-semibold uppercase text-center",
  medium: "text-sm px-4 py-3 font-medium",
  large: "text-2xl px-6 py-3 font-medium",
};

const variationClasses: Record<
  NonNullable<ButtonProps["variation"]>,
  string
> = {
  icon: "p-4 focus:outline-none",
  login:
    "rounded-md bg-[var(--color-brand-100)] text-white hover:text-brand-600",
  logout: "rounded-md hover:text-brand-600",
};

function Button({
  type = "button",
  size = "medium",
  variation = "icon",
  icon,
  children,
  onClick,
  disabled,
  className,
}: ButtonProps) {
  const baseClasses = `flex items-center gap-2 rounded-sm text-[var(--color-grey-800)] ${
    disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
  }`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variationClasses[variation]} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

export default Button;
