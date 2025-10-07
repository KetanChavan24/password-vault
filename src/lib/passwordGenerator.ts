export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean; // Exclude look-alikes like 0/O, 1/l/I
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Characters that look similar
const SIMILAR_CHARS = /[ilLI|`oO0]/g;

export function generatePassword(options: PasswordOptions): string {
  let charset = '';
  let password = '';

  // Build character set
  if (options.includeUppercase) charset += UPPERCASE;
  if (options.includeLowercase) charset += LOWERCASE;
  if (options.includeNumbers) charset += NUMBERS;
  if (options.includeSymbols) charset += SYMBOLS;

  // Remove similar characters if requested
  if (options.excludeSimilar) {
    charset = charset.replace(SIMILAR_CHARS, '');
  }

  // If no options selected, default to lowercase + numbers
  if (charset.length === 0) {
    charset = LOWERCASE + NUMBERS;
  }

  // Generate password
  const charsetLength = charset.length;
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    password += charset[randomIndex];
  }

  return password;
}

// Helper to calculate password strength
export function calculateStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { score, label: 'Weak', color: 'red' };
  if (score <= 4) return { score, label: 'Fair', color: 'orange' };
  if (score <= 6) return { score, label: 'Good', color: 'yellow' };
  return { score, label: 'Strong', color: 'green' };
}