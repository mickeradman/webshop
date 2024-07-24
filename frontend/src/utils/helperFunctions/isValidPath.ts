import { ValidPaths } from '../../types/types';

export function isValidPath(path: string): boolean {
  return Object.values(ValidPaths).includes(path as ValidPaths);
}
