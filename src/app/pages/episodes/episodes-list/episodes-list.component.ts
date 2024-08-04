import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEpisode } from '../../../models/episode.model';
import { EpisodeService } from '../../../services/episode.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CardListingComponent } from '../../../components/card-listing/card-listing.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { BannerComponent } from '../../../components/banner/banner.component';
import { EpisodeDetailComponent } from '../episode-detail/episode-detail.component';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [
    BannerComponent,
    RouterLink,
    RouterLinkActive,
    CardListingComponent,
    PaginationComponent,
    EpisodeDetailComponent,
  ],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss',
})
export class EpisodesListComponent implements OnInit {
  @Output() updated = new EventEmitter<void>();
  currentEpisodeId?: number = 1;
  currentEpisode?: IEpisode;
  episodes: IEpisode[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  headingEpisodes = {
    iconDark: '../../../../assets/icons/play-dark.svg',
    iconLight: '../../../../assets/icons/play-light.svg',
    textContent: 'Mais episódios',
  };

  constructor(private episodeService: EpisodeService, private router: Router) {}

  ngOnInit() {
    this.loadEpisodes(this.currentPage);
    this.episodeService.getTotalPages().subscribe((pages) => {
      this.totalPages = pages;
    });
  }

  onCardDetailRequested(event: { type: string; id: number }) {
    this.router.navigate([`/${event.type}`, event.id]);

    this.currentEpisodeId = event.id;
    console.log('Episodes-list', event.type, event.id);
    this.getEpisodeById(this.currentEpisodeId);
  }

  getEpisodeById(id: number) {
    this.episodeService.getEpisodeById(id).subscribe((episode) => {
      this.currentEpisode = episode as IEpisode;
      console.log('current', this.currentEpisode);
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
  refreshFavorites() {
    this.updated.emit();
  }
}
