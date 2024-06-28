export function toDotSeparatedString(
  items: (string | undefined)[],
): string | undefined {
  return items.filter(Boolean).join(' ・ ')
}
