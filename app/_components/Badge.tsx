interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "new" | "halal";
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: "bg-primary text-white shadow-md",
  success: "bg-success text-white shadow-md",
  warning: "bg-warning text-white shadow-md",
  error: "bg-error text-white shadow-md",
  new: "bg-secondary text-white shadow-md",
  halal: "bg-success text-white shadow-md",
};

export function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold backdrop-blur-sm ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
