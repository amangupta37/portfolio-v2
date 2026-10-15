import { cn } from "@/lib/utils";

interface BackdropProps {
          className?: string;
}

const Backdrop = ({ className }: BackdropProps) => {
          return (
                    <div
                              aria-hidden
                              className={cn("pointer-events-none absolute inset-0 z-[5]", className)}
                              style={{
                                        background:
                                                  "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,1) 100%)",
                              }}
                    />
          );
};

export default Backdrop;
