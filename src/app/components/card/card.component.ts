import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ICharacter } from '../../models/character.model';
import { IEpisode } from '../../models/episode.model';
import { ILocation } from '../../models/location.model';
import { FavoriteService } from '../../services/favorite.service';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { ICharacterCardInfos } from '../../models/character-card-info.model';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ETheme } from '../../enums/theme.enum';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent, CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  _dataElement!: ICharacter | IEpisode | ILocation;
  @Input()
  set dataElement(data: ICharacter | IEpisode | ILocation) {
    this._dataElement = data;
    this.setElementType();
    this.checkIsFavorite(this.dataElement.id);
  }
  @Output() unfavorited = new EventEmitter<void>();
  @Output() detailRequested = new EventEmitter<{ type: string; id: number }>();
  get dataElement() {
    return this._dataElement;
  }

  isFavorite!: boolean;
  elementType!: 'characters' | 'episodes' | 'locations' | undefined;
  currentIcon!: string;
  currentTheme!: ETheme;

  cardImages = {
    pulse: '../../../assets/icons/pulse.svg',
    info: {
      light: '../../../assets/icons/info-dark.svg',
      dark: '../../../assets/icons/info-light.svg',
    },
    episode: {
      light: '../../../assets/icons/play-light.svg',
      dark: '../../../assets/icons/play-dark.svg',
    },
    planet: {
      light: '../../../assets/icons/planet-light.svg',
      dark: '../../../assets/icons/planet-dark.svg',
    },
    heart: {
      light: '../../../assets/icons/heart-light.svg',
      dark: '../../../assets/icons/heart-dark.svg',
    },
    alien: {
      light: '../../../assets/icons/alien-light.svg',
      dark: '../../../assets/icons/alien-dark.svg',
    },
  };

  currentCharacter?: ICharacter;
  characterInfos?: ICharacterCardInfos[];

  currentEpisode?: IEpisode;
  currentImageEpisode =
    this.currentTheme == ETheme.LightTheme
      ? this.cardImages.episode.dark
      : this.cardImages.episode.light;

  currentLocation?: ILocation;
  currentImageLocation = this.cardImages.planet.light;

  iconsInfos = {
    planet: this.cardImages.planet.light,
    alien: this.cardImages.alien.light,
  };

  constructor(
    private favoriteService: FavoriteService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.elementType;
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.updateIconBasedOnTheme();
    });
  }

  updateIconBasedOnTheme() {
    this.currentImageLocation =
      this.currentTheme === ETheme.LightTheme
        ? this.cardImages.planet.light
        : this.cardImages.planet.dark;
    this.currentImageEpisode =
      this.currentTheme === ETheme.LightTheme
        ? this.cardImages.episode.light
        : this.cardImages.episode.dark;

    const infoCopy = structuredClone(this.iconsInfos);
    infoCopy.planet =
      this.currentTheme === ETheme.LightTheme
        ? this.cardImages.planet.light
        : this.cardImages.planet.dark;
    infoCopy.alien =
      this.currentTheme === ETheme.LightTheme
        ? this.cardImages.alien.light
        : this.cardImages.alien.dark;

    this.iconsInfos = infoCopy;
    this.setElementType();
  }
  onDetailRequested() {
    if (this.dataElement && this.elementType) {
      this.detailRequested.emit({
        type: this.elementType,
        id: this.dataElement.id,
      });
    }
  }

  checkIsFavorite(elementId: number) {
    if (this.elementType) {
      if (
        this.favoriteService
          .getFavorites(this.elementType)
          .some((id) => elementId == id)
      ) {
        this.isFavorite = true;
        this.currentIcon = this.cardImages.heart.dark;
        return;
      }
    }
    this.isFavorite = false;
    this.currentIcon = this.cardImages.heart.light;
  }

  setElementType() {
    const url = this.dataElement.url;
    switch (true) {
      case url.includes('character'):
        this.elementType = 'characters';
        this.currentCharacter = this.dataElement as ICharacter;
        this.characterInfos = [
          {
            icon: this.cardImages.pulse,
            textContent: this.currentCharacter.status,
          },
          {
            icon: this.iconsInfos.alien,
            textContent: this.currentCharacter.species,
          },
          {
            icon: this.iconsInfos.planet,
            textContent: this.currentCharacter.origin.name,
          },
        ];
        break;

      case url.includes('episode'):
        this.elementType = 'episodes';
        this.currentEpisode = this.dataElement as IEpisode;

        break;

      case url.includes('location'):
        this.elementType = 'locations';
        break;
    }
  }

  addFavorite(id: number) {
    this.favoriteService.addFavoriteItem(this.elementType, id);
    this.isFavorite = true;
    this.currentIcon = this.cardImages.heart.dark;
  }

  removeFavorite(id: number) {
    this.isFavorite = false;
    this.currentIcon = this.cardImages.heart.light;
    this.favoriteService.removeFavoriteItem(this.elementType, id);
    this.unfavorited.emit();
  }
}
