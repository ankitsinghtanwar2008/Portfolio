export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(
  start: number,
  end: number,
  amount: number
) {
  return start + (end - start) * amount;
}

export function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}