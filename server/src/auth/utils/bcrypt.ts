import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string): string {
  const SALT = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePasswords(
  rawPassword: string,
  hashedPassword: string,
): boolean {
  return bcrypt.compareSync(rawPassword, hashedPassword);
}
