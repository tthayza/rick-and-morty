import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoritesIds: {
    characters: number[];
    episodes: number[];
    locations: number[];
  } = {
    characters: [],
    episodes: [],
    locations: [],
  };

  private storageKey = 'favorites';
  private secretKey = 'key';

  constructor() {
    this.loadFavoritesFromLocalStorage();
  }

  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  private decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  private loadFavoritesFromLocalStorage(): void {
    const encryptedFavorites = localStorage.getItem(this.storageKey);
    if (encryptedFavorites) {
      try {
        const decryptedFavorites = this.decrypt(encryptedFavorites);
        if (decryptedFavorites) {
          this.favoritesIds = JSON.parse(decryptedFavorites);
        }
      } catch (error) {
        console.error(
          'Error decrypting or parsing favorites from local storage:',
          error
        );
        this.favoritesIds = {
          characters: [],
          episodes: [],
          locations: [],
        };
      }
    }
  }

  getFavoritesFromType(
    type: 'characters' | 'episodes' | 'locations'
  ): number[] {
    return this.favoritesIds[type];
  }

  addFavoriteItem(
    type: 'characters' | 'episodes' | 'locations' | undefined,
    id: number
  ) {
    if (type) {
      this.favoritesIds[type].push(id);
      this.saveFavoritesToLocalStorage();
    }
  }

  removeFavoriteItem(
    type: 'characters' | 'episodes' | 'locations' | undefined,
    id: number
  ) {
    if (type) {
      const itemIndexToRemove = this.favoritesIds[type].indexOf(id);
      if (itemIndexToRemove !== -1) {
        this.favoritesIds[type].splice(itemIndexToRemove, 1);
      }
      this.saveFavoritesToLocalStorage();
    }
  }

  getFavorites(type: 'characters' | 'episodes' | 'locations'): number[] {
    return this.favoritesIds[type];
  }

  saveFavoritesToLocalStorage(): void {
    const favoritesString = JSON.stringify(this.favoritesIds);
    const encryptedFavorites = this.encrypt(favoritesString);
    localStorage.setItem(this.storageKey, encryptedFavorites);
  }
}
