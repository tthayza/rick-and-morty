import { Component } from '@angular/core';
import { CharactersListComponent } from '../characters/characters-list/characters-list.component';
import { EpisodesListComponent } from '../episodes/episodes-list/episodes-list.component';
import { LocationsListComponent } from '../locations/locations-list/locations-list.component';
import { ICharacter } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';
import { EpisodeService } from '../../services/episode.service';
import { IEpisode } from '../../models/episode.model';
import { LocationService } from '../../services/location.service';
import { ILocation } from '../../models/location.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CharactersListComponent,
    EpisodesListComponent,
    LocationsListComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  characters: ICharacter[] = [];
  episodes: IEpisode[] = [];
  locations: ILocation[] = [];
  constructor(
    private characterService: CharacterService,
    private episodeService: EpisodeService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.characterService.getAllCharacters().subscribe();
    this.locationService.getAllLocations();
    this.episodeService.getAllEpisodes();
  }
}
