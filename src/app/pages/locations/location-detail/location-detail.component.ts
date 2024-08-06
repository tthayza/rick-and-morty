import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILocation } from '../../../models/location.model';
import { LocationService } from '../../../services/location.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FavoriteService } from '../../../services/favorite.service';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.scss',
})
export class LocationDetailComponent {
  @Input() currentLocation?: ILocation;
  @Output() unfavorited = new EventEmitter<void>();

  constructor(
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute,
    private favoriteService: FavoriteService
  ) {}

  currentId?: number = 1;
  elementType?: string;
  isFavorite!: boolean;
  currentFavoriteIcon?: string;

  bannerIcons = {
    logoRM: '../../../../assets/logo-a.svg',
    planet: {
      light: '../../../../assets/icons/planet-light.svg',
      dark: '../../../../assets/icons/planet-dark.svg',
    },
    heart: {
      light: '../../../../assets/icons/planet-light.svg',
      dark: '../../../../assets/icons/planet-dark.svg',
    },
    dimension: {
      light: '../../../../assets/icons/dimension-light.svg',
      dark: '../../../../assets/icons/dimension-dark.svg',
    },
    residents: {
      light: '../../../../assets/icons/smiley-light.svg',
      dark: '../../../../assets/icons/smiley-dark.svg',
    },
  };

  ngOnInit() {
    this.elementType = this.activatedRoute.snapshot.url[0].path;
    this.loadFirstLocation();
    this.activatedRoute.paramMap.subscribe((params) => {
      if (+params.get('id')! === 0) {
        this.currentId = 1;
      } else {
        this.currentId = +params.get('id')!;
      }
      console.log('id', this.currentId);
      this.locationService
        .getLocationById(this.currentId)
        .subscribe((location) => {
          this.currentLocation = location;
        });
    });
    this.checkIsFavorite(this.currentId ?? 1);
  }

  checkIsFavorite(elementId: number) {
    if (this.elementType) {
      if (
        this.favoriteService
          .getFavorites('locations')
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
    this.favoriteService.addFavoriteItem('locations', id);
    this.isFavorite = true;
    this.currentFavoriteIcon = '../../../assets/icons/heart-dark.svg';
  }

  removeFavorite(id: number) {
    this.isFavorite = false;
    this.currentFavoriteIcon = '../../../assets/icons/heart-light.svg';
    this.favoriteService.removeFavoriteItem('locations', id);
    this.unfavorited.emit();
  }

  loadFirstLocation(page = 1) {
    this.locationService.getLocationsForPage(page).subscribe((locations) => {
      if (locations.length > 0) {
        const firstLocation = locations[0];
        this.currentLocation = firstLocation;
      }
    });
  }
}
