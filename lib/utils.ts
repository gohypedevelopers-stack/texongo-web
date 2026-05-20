export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes
    .filter(c => typeof c === 'string' && c.trim().length > 0)
    .join(' ');
}
