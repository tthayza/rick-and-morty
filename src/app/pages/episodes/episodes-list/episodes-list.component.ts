import { Component, Input } from '@angular/core';
import { IEpisode } from '../../../models/episode.model';
import { EpisodeService } from '../../../services/episode.service';
import { ILocation } from '../../../models/location.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss',
})
export class EpisodesListComponent {
  episodes: IEpisode[] = [];
  page: number = 1;

  episodes$: Observable<IEpisode[]> = this.episodeService.episodes$;

  constructor(private episodeService: EpisodeService) {}
}
