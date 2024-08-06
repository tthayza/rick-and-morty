import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CharacterService } from '../../../services/character.service';
import { ICharacter } from '../../../models/character.model';
import { CardComponent } from '../../../components/card/card.component';
import { FavoriteService } from '../../../services/favorite.service';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [RouterModule, CardComponent, ButtonComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent {
  @Input() currentCharacter?: ICharacter;
  @Output() unfavorited = new EventEmitter<void>();

  constructor(
    private characterService: CharacterService,
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

  ngOnInit() {
    this.elementType = this.activatedRoute.snapshot.url[0].path;
    this.loadFirstCharacter();
    this.activatedRoute.paramMap.subscribe((params) => {
      if (+params.get('id')! === 0) {
        this.currentId = 1;
      } else {
        this.currentId = +params.get('id')!;
      }
      console.log('id', this.currentId);
      this.characterService
        .getCharacterById(this.currentId)
        .subscribe((character) => {
          this.currentCharacter = character;
          console.log('cur', this.currentCharacter);
        });
    });
    this.checkIsFavorite(this.currentId ?? 1);
  }

  loadFirstCharacter(page = 1) {
    this.characterService.getCharactersForPage(page).subscribe((characters) => {
      if (characters.length > 0) {
        const firstCharacter = characters[0];
        console.log(firstCharacter);
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
        this.currentFavoriteIcon = '../../../../assets/icons/heart-dark.svg';
        return;
      }
    }
    this.isFavorite = false;
    this.currentFavoriteIcon = '../../../../assets/icons/heart-light.svg';
  }

  addFavorite(id: number) {
    this.favoriteService.addFavoriteItem('characters', id);
    this.isFavorite = true;
    this.currentFavoriteIcon = '../../../assets/icons/heart-dark.svg';
  }

  removeFavorite(id: number) {
    this.isFavorite = false;
    this.currentFavoriteIcon = '../../../assets/icons/heart-light.svg';
    this.favoriteService.removeFavoriteItem('characters', id);
    this.unfavorited.emit();
  }
}
