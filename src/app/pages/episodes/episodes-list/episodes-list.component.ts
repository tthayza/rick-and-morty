import { Component, Input, OnInit } from '@angular/core';
import { IEpisode } from '../../../models/episode.model';
import { EpisodeService } from '../../../services/episode.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CardListingComponent } from '../../../components/card-listing/card-listing.component';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CardListingComponent],
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
  }
}
