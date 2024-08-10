import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILocation } from '../../../models/location.model';
import { LocationService } from '../../../services/location.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FavoriteService } from '../../../services/favorite.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { ETheme } from '../../../enums/theme.enum';
import { ThemeService } from '../../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [ButtonComponent, RouterLink, CommonModule],
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.scss',
})
export class LocationDetailComponent {
  @Input() currentLocation?: ILocation;
  @Output() unfavorited = new EventEmitter<void>();

  constructor(
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute,
    private favoriteService: FavoriteService,
    private themeService: ThemeService
  ) {}

  currentTheme!: ETheme;
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
      light: '../../../../assets/icons/heart-light.svg',
      dark: '../../../../assets/icons/heart-dark.svg',
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

  currentIcons = {
    planetIcon: this.bannerIcons.planet.light,
    dimensionIcon: this.bannerIcons.dimension.light,
    smileyIcon: this.bannerIcons.residents.light,
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
      this.locationService
        .getLocationById(this.currentId)
        .subscribe((location) => {
          this.currentLocation = location;
        });
    });
    this.checkIsFavorite(this.currentId ?? 1);
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
    this.updateIconBasedOnTheme();
  }

  checkIsFavorite(elementId: number) {
    if (this.elementType) {
      if (
        this.favoriteService
          .getFavorites('locations')
          .some((id) => elementId == id)
      ) {
        this.isFavorite = true;
        this.currentFavoriteIcon = this.bannerIcons.heart.dark;
        return;
      }
    }
    this.isFavorite = false;
    this.currentFavoriteIcon = this.bannerIcons.heart.light;
  }

  addFavorite(id: number) {
    this.favoriteService.addFavoriteItem('locations', id);
    this.isFavorite = true;
    this.currentFavoriteIcon = this.bannerIcons.heart.dark;
  }

  removeFavorite(id: number) {
    this.isFavorite = false;
    this.currentFavoriteIcon = this.bannerIcons.heart.light;
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
  updateIconBasedOnTheme() {
    this.currentIcons.planetIcon =
      this.currentTheme == ETheme.LightTheme
        ? this.bannerIcons.planet.light
        : this.bannerIcons.planet.dark;
    this.currentIcons.dimensionIcon =
      this.currentTheme == ETheme.LightTheme
        ? this.bannerIcons.dimension.light
        : this.bannerIcons.dimension.dark;
    this.currentIcons.smileyIcon =
      this.currentTheme == ETheme.LightTheme
        ? this.bannerIcons.residents.light
        : this.bannerIcons.residents.dark;
  }
}
