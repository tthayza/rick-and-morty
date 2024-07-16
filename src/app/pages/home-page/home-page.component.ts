import { ICharacter } from './../../models/character.model';
import { Component } from '@angular/core';
import { CharactersListComponent } from '../characters/characters-list/characters-list.component';
import { EpisodesListComponent } from '../episodes/episodes-list/episodes-list.component';
import { LocationsListComponent } from '../locations/locations-list/locations-list.component';
import { CharacterService } from '../../services/character.service';
import { EpisodeService } from '../../services/episode.service';
import { IEpisode } from '../../models/episode.model';
import { LocationService } from '../../services/location.service';
import { ILocation } from '../../models/location.model';
import { BannerComponent } from '../../components/banner/banner.component';
import { CardListingComponent } from '../../components/card-listing/card-listing.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CharactersListComponent,
    EpisodesListComponent,
    LocationsListComponent,
    BannerComponent,
    CardListingComponent,
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  elements: {
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
    private episodeService: EpisodeService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
    this.loadEpisodes();
    this.loadLocations();
  }

  loadCharacters(page: number = 1) {
    this.characterService.getCharactersForPage(page).subscribe((characters) => {
      this.elements.characters = characters;
    });
  }
  loadEpisodes(page: number = 1) {
    this.episodeService.getEpisodesForPage(page).subscribe((episodes) => {
      this.elements.episodes = episodes;
    });
  }
  loadLocations(page: number = 1) {
    this.locationService.getLocationsForPage(page).subscribe((locations) => {
      this.elements.locations = locations;
    });
  }
}
