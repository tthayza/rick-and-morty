import { Component, Input } from '@angular/core';
import { IEpisode } from '../../../models/episode.model';
import { EpisodeService } from '../../../services/episode.service';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss',
})
export class EpisodesListComponent {
  @Input() itemLimit!: string;
  episodes: IEpisode[] = [];
  page: number = 1;

  constructor(private episodeService: EpisodeService) {}

  ngOnInit(): void {
    this.loadEpisodes();
  }
  loadEpisodes(): void {
    this.episodeService.getAllEpisodes(this.page).subscribe((data) => {
      this.episodes = data;
    });
  }
}
