import { IFavoritesIds } from './../../models/favorites-ids.model';
import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { FavoriteService } from '../../services/favorite.service';
import { EpisodeService } from '../../services/episode.service';
import { LocationService } from '../../services/location.service';
import { IFavoritesElements } from '../../models/favorites-elements.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  favorites: IFavoritesElements = {
    characters: [],
    episodes: [],
    locations: [],
  };

  constructor(
    private characterService: CharacterService,
    private favoriteService: FavoriteService,
    private episodeService: EpisodeService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadFavoriteCharacters();
    this.loadFavoriteEpisodes();
    this.loadFavoriteLocations();
  }

  loadFavoriteCharacters(): void {
    const favoriteIds = this.favoriteService.getFavoritesFromType('characters');
    if (favoriteIds.length > 0) {
      this.characterService
        .getMultipleCharacters(favoriteIds)
        .subscribe((data) => {
          this.favorites.characters = data;
        });
    }
  }

  loadFavoriteLocations(): void {
    const favoriteIds = this.favoriteService.getFavoritesFromType('locations');
    if (favoriteIds.length > 0) {
      this.locationService
        .getMultipleLocations(favoriteIds)
        .subscribe((data) => {
          this.favorites.locations = [...data];
        });
    }
  }

  loadFavoriteEpisodes(): void {
    const favoriteIds = this.favoriteService.getFavoritesFromType('episodes');
    if (favoriteIds.length > 0) {
      this.episodeService.getMultipleEpisodes(favoriteIds).subscribe((data) => {
        this.favorites.episodes = [...data];
      });
    }
  }
}
