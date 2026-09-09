export function optionalSearchString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function requiredSearchString(value: unknown): string {
  return optionalSearchString(value) ?? "";
}

export function positiveSearchInteger(value: unknown): number | undefined {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isInteger(parsed) && parsed >= 1 ? parsed : undefined;
}
