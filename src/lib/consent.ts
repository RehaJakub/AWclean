export interface ConsentPreferences {
  personalized: boolean;
  analytics: boolean;
  marketing: boolean;
}
export interface SavedConsent extends ConsentPreferences {
  version: 1;
  savedAt: string;
}
export const consentStorageKey = "awclean-consent-v1";
export const consentLifetime = 180 * 24 * 60 * 60 * 1000;
export const defaultConsent: ConsentPreferences = {
  personalized: false,
  analytics: false,
  marketing: false,
};
export function parseConsent(
  raw: string | null,
  now = Date.now(),
): SavedConsent | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null) return null;
    if (
      !("version" in value) ||
      value.version !== 1 ||
      !("savedAt" in value) ||
      typeof value.savedAt !== "string" ||
      !("personalized" in value) ||
      typeof value.personalized !== "boolean" ||
      !("analytics" in value) ||
      typeof value.analytics !== "boolean" ||
      !("marketing" in value) ||
      typeof value.marketing !== "boolean"
    )
      return null;
    const time = Date.parse(value.savedAt);
    if (!Number.isFinite(time) || time > now || now - time >= consentLifetime)
      return null;
    return {
      version: 1,
      savedAt: value.savedAt,
      personalized: value.personalized,
      analytics: value.analytics,
      marketing: value.marketing,
    };
  } catch {
    return null;
  }
}
export function saveConsent(
  storage: Pick<Storage, "setItem">,
  preferences: ConsentPreferences,
  now = new Date(),
): SavedConsent {
  const saved: SavedConsent = {
    version: 1,
    savedAt: now.toISOString(),
    personalized: preferences.personalized,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
  };
  storage.setItem(consentStorageKey, JSON.stringify(saved));
  return saved;
}
