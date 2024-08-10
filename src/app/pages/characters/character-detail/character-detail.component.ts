import { map } from 'rxjs';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CharacterService } from '../../../services/character.service';
import { ICharacter } from '../../../models/character.model';
import { CardComponent } from '../../../components/card/card.component';
import { FavoriteService } from '../../../services/favorite.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { ETheme } from '../../../enums/theme.enum';
import { ThemeService } from '../../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [RouterModule, CardComponent, ButtonComponent, CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent {
  @Input() currentCharacter?: ICharacter;
  @Output() unfavorited = new EventEmitter<void>();

  currentTheme!: ETheme;
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
    human: {
      light: '../../../../assets/icons/alien-light.svg',
      dark: '../../../../assets/icons/alien-dark.svg',
    },
    gender: {
      light: '../../../../assets/icons/intersex-light.svg',
      dark: '../../../../assets/icons/intersex-dark.svg',
    },
    planet: {
      light: '../../../../assets/icons/planet-light.svg',
      dark: '../../../../assets/icons/planet-dark.svg',
    },
    mapPin: {
      light: '../../../../assets/icons/map-pin-light.svg',
      dark: '../../../../assets/icons/map-pin-dark.svg',
    },
    info: {
      light: '../../../../assets/icons/info-light.svg',
      dark: '../../../../assets/icons/info-dark.svg',
    },
    pulse: '../../../../assets/icons/pulse.svg',
  };

  currentIcons = {
    currentPlayIcon: this.bannerIcons.play.light,
    currentAlienIcon: this.bannerIcons.human.light,
    currentGenderIcon: this.bannerIcons.gender.light,
    currentPlanetIcon: this.bannerIcons.planet.light,
    currentPinIcon: this.bannerIcons.mapPin.light,
  };

  constructor(
    private characterService: CharacterService,
    private activatedRoute: ActivatedRoute,
    private favoriteService: FavoriteService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.elementType = this.activatedRoute.snapshot.url[0].path;
    this.loadFirstCharacter();
    this.activatedRoute.paramMap.subscribe((params) => {
      if (+params.get('id')! === 0) {
        this.currentId = 1;
      } else {
        this.currentId = +params.get('id')!;
      }
      this.characterService
        .getCharacterById(this.currentId)
        .subscribe((character) => {
          this.currentCharacter = character;
        });
    });
    this.checkIsFavorite(this.currentId ?? 1);
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.updateIconBasedOnTheme();
    });
  }

  loadFirstCharacter(page = 1) {
    this.characterService.getCharactersForPage(page).subscribe((characters) => {
      if (characters.length > 0) {
        const firstCharacter = characters[0];
        this.currentCharacter = firstCharacter;
      }
    });
  }

  checkIsFavorite(elementId: number) {
    if (this.elementType) {
      if (
        this.favoriteService
          .getFavorites('characters')
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
    this.favoriteService.addFavoriteItem('characters', id);
    this.isFavorite = true;
    this.currentFavoriteIcon = this.bannerIcons.heart.dark;
  }

  removeFavorite(id: number) {
    this.isFavorite = false;
    this.currentFavoriteIcon = this.bannerIcons.heart.light;
    this.favoriteService.removeFavoriteItem('characters', id);
    this.unfavorited.emit();
  }

  updateIconBasedOnTheme() {
    this.currentIcons.currentAlienIcon =
      this.currentTheme == ETheme.LightTheme
        ? this.bannerIcons.human.light
        : this.bannerIcons.human.dark;
    this.currentIcons.currentPlanetIcon =
      this.currentTheme == ETheme.LightTheme
        ? this.bannerIcons.planet.light
        : this.bannerIcons.planet.dark;
    this.currentIcons.currentPlayIcon =
      this.currentTheme == ETheme.LightTheme
        ? this.bannerIcons.play.light
        : this.bannerIcons.play.dark;
    this.currentIcons.currentPinIcon =
      this.currentTheme == ETheme.LightTheme
        ? this.bannerIcons.mapPin.light
        : this.bannerIcons.mapPin.dark;
    this.currentIcons.currentGenderIcon =
      this.currentTheme == ETheme.LightTheme
        ? this.bannerIcons.gender.light
        : this.bannerIcons.gender.dark;
  }
}
