import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICharacter } from '../../models/character.model';
import { IEpisode } from '../../models/episode.model';
import { ILocation } from '../../models/location.model';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
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

  constructor(private favoriteService: FavoriteService) {}

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
        break;

      case url.includes('episode'):
        this.elementType = 'episodes';
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
