import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ICharacter } from '../../models/character.model';
import { IEpisode } from '../../models/episode.model';
import { ILocation } from '../../models/location.model';
import { IHeading } from '../../models/heading-card-list.model';
import { ETheme } from '../../enums/theme.enum';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-card-listing',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './card-listing.component.html',
  styleUrl: './card-listing.component.scss',
})
export class CardListingComponent implements OnInit {
  currentTheme!: ETheme;
  @Input() elementsList: ICharacter[] | IEpisode[] | ILocation[] = [];
  @Input() heading?: IHeading;
  @Output() updated = new EventEmitter<void>();
  @Output() cardDetailRequested = new EventEmitter<{
    type: string;
    id: number;
  }>();

  currentHeadingIcon?: string;

  constructor(private themeService: ThemeService) {}
  ngOnInit() {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.updateIconBasedOnTheme();
    });
  }

  refreshFavorites() {
    this.updated.emit();
  }

  onDetailRequested(event: { type: string; id: number }) {
    this.cardDetailRequested.emit(event);
  }

  updateIconBasedOnTheme() {
    this.currentHeadingIcon =
      this.currentTheme === ETheme.LightTheme
        ? this.heading?.iconLight
        : this.heading?.iconDark;
  }
}
