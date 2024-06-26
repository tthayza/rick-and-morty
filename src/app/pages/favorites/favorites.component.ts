import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { FavoriteService } from '../../services/favorite.service';
import { EpisodeService } from '../../services/episode.service';
import { LocationService } from '../../services/location.service';
import { ICharacter } from '../../models/character.model';
import { IFavorites } from '../../models/favorites.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  favorites: IFavorites = {
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
  }

  // fazer com que o parametro seja o nome do tipo
  loadFavoriteCharacters(): void {
    const favoriteIds = this.favoriteService.getFavorites();
    if (favoriteIds.length > 0) {
      this.characterService
        .getMultipleCharacters(favoriteIds)
        .subscribe((data) => {
          this.favorites.characters = [...data];
        });
    }
  }
}
