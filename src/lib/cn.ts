/**
 * Minimal class name utility (clsx-compatible drop-in).
 * Accepts strings, undefined, null, false — filters falsy values and joins with space.
 */
export function clsx(
  ...args: (string | undefined | null | false | 0)[]
): string {
  return args.filter(Boolean).join(' ')
}
