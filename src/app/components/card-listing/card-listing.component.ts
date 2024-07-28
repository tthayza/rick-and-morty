import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ICharacter } from '../../models/character.model';
import { IEpisode } from '../../models/episode.model';
import { ILocation } from '../../models/location.model';

@Component({
  selector: 'app-card-listing',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-listing.component.html',
  styleUrl: './card-listing.component.scss',
})
export class CardListingComponent {
  @Input() elementsList: ICharacter[] | IEpisode[] | ILocation[] = [];
  @Input() titleList: string = '';
  @Output() updated = new EventEmitter<void>();

  refreshFavorites() {
    this.updated.emit();
  }
}
