import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function getCurrentDirectory() {
  const __filename = fileURLToPath(import.meta.url);
  return dirname(__filename);
}