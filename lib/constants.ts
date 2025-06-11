export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/);
export const PASSWORD_REGEX_ERROR = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";

export const HASH_SALT = 12;
