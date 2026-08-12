"use client";

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
}

export default function RangeSlider({
  min,
  max,
  step,
  value,
  onChange,
  formatValue = (v) => String(v),
}: RangeSliderProps) {
  const [lo, hi] = value;

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.min(Number(e.target.value), hi - step);
    onChange([next, hi]);
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.max(Number(e.target.value), lo + step);
    onChange([lo, next]);
  };

  const loPct = ((lo - min) / (max - min)) * 100;
  const hiPct = ((hi - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-sm font-medium text-foreground mb-3 tabular-nums">
        <span>{formatValue(lo)}</span>
        <span>{formatValue(hi)}</span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-border" />
        <div
          className="absolute h-1.5 rounded-full bg-accent"
          style={{ left: `${loPct}%`, right: `${100 - hiPct}%` }}
        />
        <input
          type="range"
          aria-label="Minimum"
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={handleMin}
          className="range-slider-input"
        />
        <input
          type="range"
          aria-label="Maximum"
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={handleMax}
          className="range-slider-input"
        />
      </div>
    </div>
  );
}
