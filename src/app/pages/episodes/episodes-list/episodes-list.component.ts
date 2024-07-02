import { Component, Input, OnInit } from '@angular/core';
import { IEpisode } from '../../../models/episode.model';
import { EpisodeService } from '../../../services/episode.service';
import { ILocation } from '../../../models/location.model';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss',
})
export class EpisodesListComponent implements OnInit {
  episodes: IEpisode[] = [];
  page: number = 1;

  constructor(private episodeService: EpisodeService) {}

  ngOnInit() {
    this.episodeService
      .getAllEpisodes()
      .subscribe((data) => (this.episodes = data));
    console.log('eps', this.episodes);
  }
}
