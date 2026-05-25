import { CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface HeaderCardProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  variant?: "default" | "compact" | "elegant";
  backgroundStyle?: "gradient" | "glass" | "solid" | "pattern";
  showActionArea?: boolean;
  actionArea?: ReactNode;
  stats?: Array<{
    title: string;
    value: string | number;
    description: string;
  }>;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  role?: any;
  children?: ReactNode;
}

const HeaderCard = ({
  title,
  description,
  icon,
  gradientFrom = "from-slate-900",
  gradientTo = "to-slate-950",
  variant = "default",
  backgroundStyle = "gradient",
  showActionArea = false,
  actionArea,
  stats,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  children,
}: HeaderCardProps) => {
  const isCompact = variant === "compact";
  const isElegant = variant === "elegant";

  const getBackgroundStyle = () => {
    switch (backgroundStyle) {
      case "glass":
        return "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl";
      case "solid":
        return "bg-slate-900 shadow-xl border border-white/5";
      case "pattern":
        return `bg-[#020617] bg-gradient-to-r ${gradientFrom} ${gradientTo} relative overflow-hidden shadow-2xl border border-white/10`;
      default:
        return `bg-[#0f172a] bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-lg border border-white/5`;
    }
  };

  const PatternOverlay = () => (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }} />
    </div>
  );

  const defaultIcon = (
    <div className={`flex items-center justify-center rounded-2xl backdrop-blur-md border border-white/20 shadow-xl ${
      isCompact ? "h-10 w-10" : isElegant ? "h-20 w-20 rounded-[2rem]" : "h-14 w-14"
    } bg-white/10 transition-all duration-500 hover:scale-110 hover:bg-white/20`}>
      {icon || (
        <svg
          className={isCompact ? "h-5 w-5" : isElegant ? "h-10 w-10" : "h-6 w-6"}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      )}
    </div>
  );

  return (
    <div className={`relative overflow-visible group ${className}`}>
      <div
        className={`
          text-white rounded-[2.5rem] relative overflow-hidden
          transition-all duration-700 ease-in-out
          hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)]
          ${getBackgroundStyle()}
          ${isCompact ? "px-5 py-3" : isElegant ? "p-8 md:p-10 lg:p-12" : "p-6 md:p-8"}
        `}
      >
        {backgroundStyle === "pattern" && <PatternOverlay />}

        <div className={`relative z-10 flex flex-col space-y-6 ${showActionArea ? "md:flex-row md:items-center md:justify-between md:space-y-0" : ""}`}>
          <div className={`flex items-center gap-6 md:gap-10 ${isElegant ? "flex-col md:flex-row text-center md:text-left" : ""}`}>
            {defaultIcon}
            <div className="flex-1 space-y-3">
              <CardTitle className={`
                font-black text-white tracking-tighter drop-shadow-2xl
                ${titleClassName}
                ${isCompact ? "text-lg" : isElegant ? "text-3xl md:text-5xl lg:text-6xl" : "text-xl md:text-3xl"}
              `}>
                {title}
              </CardTitle>
              {description && (
                <p className={`
                  text-white/80 leading-relaxed font-medium drop-shadow-lg
                  ${descriptionClassName}
                  ${isCompact ? "text-xs" : isElegant ? "text-base md:text-xl lg:text-2xl max-w-3xl" : "text-sm md:text-base opacity-90"}
                `}>
                  {description}
                </p>
              )}
            </div>
          </div>

          {showActionArea && actionArea && (
            <div className="flex-shrink-0 relative z-20">
              {actionArea}
            </div>
          )}
        </div>

        {stats && stats.length > 0 && (
          <div className="relative z-10 mt-12 pt-10 border-t border-white/10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                >
                  <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{stat.title}</p>
                  <p className="text-white text-3xl font-black tracking-tighter mb-1">{stat.value}</p>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-none">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {children}
      </div>

      {isElegant && (
        <>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
        </>
      )}
    </div>
  );
};

export default HeaderCard;