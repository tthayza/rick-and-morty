import { ICharacter } from './../../models/character.model';
import { Component, Input } from '@angular/core';
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
import { ETheme } from '../../enums/theme.enum';
import { FilterComponent } from '../../components/filter/filter.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CharactersListComponent,
    EpisodesListComponent,
    LocationsListComponent,
    BannerComponent,
    CardListingComponent,
    FilterComponent,
    CommonModule,
    RouterLink,
    ButtonComponent,
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

  keyToPortuguese: { [key: string]: string } = {
    characters: 'Personagens',
    episodes: 'Episódios',
    locations: 'Localizações',
  };

  filteredElements: any[] = [];
  currentFilter: string | null = null;
  searchTerm: string = '';
  seeAllButton = {
    textContent: 'Ver todos',
    iconDark: '../../../assets/icons/squares-four-dark.svg',
    iconLight: '../../../assets/icons/squares-four-light.svg',
  };

  currentTheme: ETheme = ETheme.LightTheme;
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

  searchCharacters(value: string) {
    if (value) {
      this.characterService.filterCharacters(value).subscribe((characters) => {
        this.filteredElements = characters;
      });
    }
  }
  searchLocations(value: string) {
    if (value) {
      this.locationService.filterLocations(value).subscribe((locations) => {
        this.filteredElements = locations;
      });
    }
  }
  searchEpisodes(value: string) {
    if (value) {
      this.episodeService.filterEpisodes(value).subscribe((episodes) => {
        this.filteredElements = episodes;
      });
    }
  }

  onThemeChange(theme: ETheme) {
    this.currentTheme = theme;
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm.toLowerCase();
  }

  onFilterChange(filter: string) {
    this.currentFilter = filter;
  }

  applyFilter() {
    this.filteredElements = [];
    if (this.currentFilter === 'Personagens') {
      this.searchCharacters(this.searchTerm);
    } else if (this.currentFilter === 'Localizações') {
      this.searchLocations(this.searchTerm);
    } else if (this.currentFilter === 'Episódios') {
      this.searchEpisodes(this.searchTerm);
    }
  }
}
