import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ICharacter } from '../../models/character.model';
import { IEpisode } from '../../models/episode.model';
import { ILocation } from '../../models/location.model';
import { IHeading } from '../../models/heading-card-list.model';

@Component({
  selector: 'app-card-listing',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-listing.component.html',
  styleUrl: './card-listing.component.scss',
})
export class CardListingComponent {
  @Input() elementsList: ICharacter[] | IEpisode[] | ILocation[] = [];
  @Input() heading?: IHeading;
  @Output() updated = new EventEmitter<void>();
  @Output() cardDetailRequested = new EventEmitter<{
    type: string;
    id: number;
  }>();

  refreshFavorites() {
    this.updated.emit();
  }

  onDetailRequested(event: { type: string; id: number }) {
    // Reemite o evento para o componente pai
    this.cardDetailRequested.emit(event);
  }
}
