import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { FavoriteService } from '../../services/favorite.service';
import { EpisodeService } from '../../services/episode.service';
import { LocationService } from '../../services/location.service';
import { CardListingComponent } from '../../components/card-listing/card-listing.component';
import { ICharacter } from '../../models/character.model';
import { IEpisode } from '../../models/episode.model';
import { ILocation } from '../../models/location.model';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../../components/banner/banner.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CardListingComponent, CommonModule, BannerComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  favorites: {
    characters: ICharacter[];
    episodes: IEpisode[];
    locations: ILocation[];
  } = {
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
    this.loadFavorites();
  }

  loadFavoriteCharacters(): void {
    const favoriteIds = this.favoriteService.getFavoritesFromType('characters');
    if (favoriteIds.length == 0) {
      this.favorites.characters = [];
      return;
    }
    this.characterService
      .getMultipleCharacters(favoriteIds)
      .subscribe((data) => {
        this.favorites.characters = data;
      });
  }

  loadFavoriteLocations(): void {
    const favoriteIds = this.favoriteService.getFavoritesFromType('locations');
    if (favoriteIds.length == 0) {
      this.favorites.locations = [];
      return;
    }
    this.locationService.getMultipleLocations(favoriteIds).subscribe((data) => {
      this.favorites.locations = data;
    });
  }

  loadFavoriteEpisodes(): void {
    const favoriteIds = this.favoriteService.getFavoritesFromType('episodes');
    if (favoriteIds.length == 0) {
      this.favorites.episodes = [];
      return;
    }
    this.episodeService.getMultipleEpisodes(favoriteIds).subscribe((data) => {
      this.favorites.episodes = data;
    });
  }

  loadFavorites(): void {
    this.loadFavoriteCharacters();
    this.loadFavoriteEpisodes();
    this.loadFavoriteLocations();
  }
}
