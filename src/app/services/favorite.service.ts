import { Injectable } from '@angular/core';

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
    type: 'characters' | 'episodes' | 'locations',
    id: number
  ): void {
    this.favoritesIds[type].push(id);
  }

  removeFavoriteItem(
    type: 'characters' | 'episodes' | 'locations',
    id: number
  ): void {
    const itemIndexToRemove = this.favoritesIds[type].indexOf(id);
    if (itemIndexToRemove !== -1) {
      this.favoritesIds[type].splice(itemIndexToRemove, 1);
    }
  }

  isFavoriteItem(
    type: 'characters' | 'episodes' | 'locations',
    id: number
  ): boolean {
    return this.favoritesIds[type].some((favId) => favId === id);
  }
}
