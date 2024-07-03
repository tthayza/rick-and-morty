import { Injectable } from '@angular/core';
import { IFavoritesIds } from '../models/favorites-ids.model';

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
    localStorage.setItem('favorites', JSON.stringify(this.favoritesIds));
  }
}
