import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEpisode } from '../../../models/episode.model';
import { ButtonComponent } from '../../../components/button/button.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EpisodeService } from '../../../services/episode.service';
import { FavoriteService } from '../../../services/favorite.service';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.scss',
})
export class EpisodeDetailComponent {
  @Input() currentEpisode?: IEpisode;
  @Output() unfavorited = new EventEmitter<void>();

  constructor(
    private episodeService: EpisodeService,
    private activatedRoute: ActivatedRoute,
    private favoriteService: FavoriteService
  ) {}

  // currentCharacter?: ICharacter;
  currentId?: number = 1;
  elementType?: string;
  isFavorite!: boolean;
  currentFavoriteIcon?: string;

  bannerIcons = {
    logoRM: '../../../../assets/logo-a.svg',
    heart: {
      light: '../../../../assets/icons/heart-light.svg',
      dark: '../../../../assets/icons/heart-dark.svg',
    },
    play: {
      light: '../../../../assets/icons/play-light.svg',
      dark: '../../../../assets/icons/play-dark.svg',
    },
    calendar: {
      light: '../../../../assets/icons/calendar-light.svg',
      dark: '../../../../assets/icons/calendar-dark.svg',
    },
    queue: {
      light: '../../../../assets/icons/queue-light.svg',
      dark: '../../../../assets/icons/queue-dark.svg',
    },
    smiley: {
      light: '../../../../assets/icons/smiley-light.svg',
      dark: '../../../../assets/icons/smiley-dark.svg',
    },
  };

  ngOnInit() {
    this.elementType = this.activatedRoute.snapshot.url[0].path;
    this.loadFirstEpisode();
    this.activatedRoute.paramMap.subscribe((params) => {
      if (+params.get('id')! === 0) {
        this.currentId = 1;
      } else {
        this.currentId = +params.get('id')!;
      }
      console.log('id', this.currentId);
      this.episodeService
        .getEpisodeById(this.currentId)
        .subscribe((episode) => {
          this.currentEpisode = episode;
          console.log('cur', this.currentEpisode);
        });
    });
    this.checkIsFavorite(this.currentId ?? 1);
  }

  checkIsFavorite(elementId: number) {
    if (this.elementType) {
      if (
        this.favoriteService
          .getFavorites('episodes')
          .some((id) => elementId == id)
      ) {
        this.isFavorite = true;
        this.currentFavoriteIcon = '../../../../assets/icons/heart-dark.svg';
        return;
      }
    }
    this.isFavorite = false;
    this.currentFavoriteIcon = '../../../../assets/icons/heart-light.svg';
  }

  addFavorite(id: number) {
    this.favoriteService.addFavoriteItem('episodes', id);
    this.isFavorite = true;
    this.currentFavoriteIcon = '../../../assets/icons/heart-dark.svg';
  }

  removeFavorite(id: number) {
    this.isFavorite = false;
    this.currentFavoriteIcon = '../../../assets/icons/heart-light.svg';
    this.favoriteService.removeFavoriteItem('episodes', id);
    this.unfavorited.emit();
  }

  loadFirstEpisode(page = 1) {
    this.episodeService.getEpisodesForPage(page).subscribe((episodes) => {
      if (episodes.length > 0) {
        const firstEpisode = episodes[0];
        console.log(firstEpisode);
        this.currentEpisode = firstEpisode;
      }
    });
  }
}
