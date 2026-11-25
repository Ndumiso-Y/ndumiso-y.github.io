// Upwork version switch. True only in `npm run build:upwork` / `dev:upwork`.
// Vite replaces import.meta.env.VITE_UPWORK with a literal, so code and strings
// behind `UPWORK ? ... : ...` are dropped from the bundle that doesn't use them.
export const UPWORK = import.meta.env.VITE_UPWORK === true

// Owner's Upwork freelancer profile. Empty until provided; the Upwork buttons
// stay hidden while it is empty (never guessed).
export const UPWORK_PROFILE_URL = ''
