import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  }

  get dataElement() {
    return this._dataElement;
  }
  //verificar se elemento está na lista de favoritos para manipular isFav
  isFavorite = false;
  elementType: 'characters' | 'episodes' | 'locations' | undefined;
  currentIcon = '../../../assets/icons/heart-light.svg';

  constructor(private favoriteService: FavoriteService) {}
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  // }

  setElementType() {
    const url = this.dataElement.url;
    console.log('url', url);
    //substituir switch por if
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
    this.favoriteService.removeFavoriteItem(this.elementType, id);
    this.isFavorite = false;
    this.currentIcon = '../../../assets/icons/heart-light.svg';
    //emitir evento (output para recarregar a lista)
  }
}
