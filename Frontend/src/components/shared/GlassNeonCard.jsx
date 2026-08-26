import React from 'react';

export default function GlassNeonCard({
  image,
  title,
  subtitle,
  description,
  socialLinks = [],
  children,
  className = ""
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[16px] border border-white/12 bg-[rgba(13,17,28,0.65)] backdrop-blur-[20px] shadow-lg transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#ff6b00] hover:shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(255,107,0,0.35)] hover:[transform:translateY(-6px)_perspective(1000px)_rotateX(1.5deg)_rotateY(-1.5deg)] ${className}`}
    >
      {/* Optional Top Image with Inner Scale Zoom */}
      {image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#07080d]">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0d18] via-transparent to-transparent opacity-80" />
          <img
            src={image}
            alt={title || "Card image"}
            className="h-full w-full object-cover transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        </div>
      )}

      {/* Card Content Body */}
      <div className="p-5 flex flex-col justify-between relative z-20 font-main">
        <div>
          {title && (
            <h3 className="font-main font-bold text-lg text-white transition-colors duration-300 group-hover:text-[#ff6b00]">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="font-main text-xs sm:text-sm font-semibold text-[#00f0ff] mt-0.5">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="font-main text-sm text-slate-300 mt-2 leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Social / Action Buttons with Localized Neon Glow Lift */}
        {socialLinks.length > 0 && (
          <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-4">
            {socialLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href || "#"}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label || "Social link"}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px] hover:border-[#ff6b00] hover:bg-[#ff6b00]/20 hover:text-[#ff6b00] hover:shadow-[0_0_15px_rgba(255,107,0,0.5)]"
              >
                {item.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
