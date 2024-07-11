import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  variant: "primary" | "secondary";
}

const buttonVariants = tv({
  base: "flex items-center justify-center gap-2 rounded-lg px-5 font-medium",
  variants: {
    variant: {
      primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
      secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
    },

    size: {
      default: "py-2",
      full: "w-full h-11",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export const Button = ({ children, variant, size, ...props }: ButtonProps) => {
  return (
    <button className={buttonVariants({ variant, size })} {...props}>
      {children}
    </button>
  );
};
