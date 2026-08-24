export default function Logo({ size = 40, showText = true, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect width="100" height="100" rx="20" fill="#05090a" />
        <path
          d="M30 25 L14 50 L30 75"
          stroke="#14c9b7"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M70 25 L86 50 L70 75"
          stroke="#14c9b7"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1="58"
          y1="20"
          x2="42"
          y2="80"
          stroke="#ff7a29"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="37" cy="50" r="4.5" fill="#14c9b7" />
        <circle cx="63" cy="50" r="4.5" fill="#14c9b7" />
      </svg>
      {showText && (
        <span className="font-display font-semibold leading-tight text-[15px] text-white">
          Geek Room
          <span className="block text-[11px] tracking-[0.25em] text-teal-soft">
            JIMS
          </span>
        </span>
      )}
    </div>
  );
}
