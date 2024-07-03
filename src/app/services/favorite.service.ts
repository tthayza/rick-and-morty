import { Injectable } from '@angular/core';
import { IFavoritesElements } from '../models/favorites-elements.model';
import { IFavoritesIds } from '../models/favorites-ids.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private storageKey = 'favorites';
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
    if (type) this.favoritesIds[type].push(id);
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
    }
  }

  getFavorites(): number[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }
  saveFavoritesToLocalStorage(): void {
    const favorites: IFavoritesIds = {
      characters: this.favoritesIds.characters,
      episodes: this.favoritesIds.episodes,
      locations: this.favoritesIds.locations,
    };
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // isFavoriteItem(
  //   type: 'characters' | 'episodes' | 'locations',
  //   id: number
  // ): boolean {
  //   return this.favoritesIds[type].some((favId) => favId === id);
  // }
}
