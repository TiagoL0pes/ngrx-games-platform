import { Platform } from './plaftom';
export interface GameModel {
  id: string;
  name: string;
  genre?: string;
  downloads: number;
  platform: Platform;
}
