import { Component, Input, OnInit } from '@angular/core';
import { IEpisode } from '../../../models/episode.model';
import { EpisodeService } from '../../../services/episode.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CardListingComponent } from '../../../components/card-listing/card-listing.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CardListingComponent,
    PaginationComponent,
  ],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss',
})
export class EpisodesListComponent implements OnInit {
  episodes: IEpisode[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private episodeService: EpisodeService) {}

  ngOnInit() {
    this.loadEpisodes(this.currentPage);
    this.episodeService.getTotalPages().subscribe((pages) => {
      this.totalPages = pages;
    });
  }

  loadEpisodes(page: number) {
    this.episodeService.getEpisodesForPage(page).subscribe((episodes) => {
      this.episodes = episodes;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadEpisodes(this.currentPage);
  }
}
