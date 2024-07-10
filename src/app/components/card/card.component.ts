import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICharacter } from '../../models/character.model';
import { IEpisode } from '../../models/episode.model';
import { ILocation } from '../../models/location.model';
import { FavoriteService } from '../../services/favorite.service';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { ICharacterCardInfos } from '../../models/character-card-info.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
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
  get dataElement() {
    return this._dataElement;
  }
  isFavorite!: boolean;
  elementType!: 'characters' | 'episodes' | 'locations' | undefined;
  currentIcon!: string;

  /*icons. change according theme. */
  infoIconLight = '../../../assets/icons/info-light.svg';
  infoIconDark = '../../../assets/icons/info-dark.svg';

  currentCharacter?: ICharacter;
  characterInfos?: ICharacterCardInfos[];

  currentEpisode?: IEpisode;
  iconCardEpisode = '../../../assets/icons/play-light.svg';

  currentLocation?: ILocation;
  iconCardLocation = '../../../assets/icons/planet-light.svg';

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.elementType;
  }

  checkIsFavorite(elementId: number) {
    if (this.elementType) {
      if (
        this.favoriteService
          .getFavorites(this.elementType)
          .some((id) => elementId == id)
      ) {
        this.isFavorite = true;
        this.currentIcon = '../../../assets/icons/heart-dark.svg';
        return;
      }
    }
    this.isFavorite = false;
    this.currentIcon = '../../../assets/icons/heart-light.svg';
  }

  setElementType() {
    const url = this.dataElement.url;
    switch (true) {
      case url.includes('character'):
        this.elementType = 'characters';
        this.currentCharacter = this.dataElement as ICharacter;
        this.characterInfos = [
          {
            icon: '../../../assets/icons/pulse.svg',
            textContent: this.currentCharacter.status,
          },
          {
            icon: '../../../assets/icons/alien-light.svg',
            textContent: this.currentCharacter.species,
          },
          {
            icon: '../../../assets/icons/planet-light.svg',
            textContent: this.currentCharacter.location.name,
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
    this.currentIcon = '../../../assets/icons/heart-dark.svg';
  }

  removeFavorite(id: number) {
    this.isFavorite = false;
    this.currentIcon = '../../../assets/icons/heart-light.svg';
    this.favoriteService.removeFavoriteItem(this.elementType, id);
    this.unfavorited.emit();
  }
}
