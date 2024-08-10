import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICharacter } from '../../../models/character.model';
import { CharacterService } from '../../../services/character.service';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { CardComponent } from '../../../components/card/card.component';
import { CardListingComponent } from '../../../components/card-listing/card-listing.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { BannerComponent } from '../../../components/banner/banner.component';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { ThemeService } from '../../../services/theme.service';
import { ETheme } from '../../../enums/theme.enum';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [
    BannerComponent,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    CardComponent,
    CardListingComponent,
    PaginationComponent,
    CharactersListComponent,
    CharacterDetailComponent,
  ],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent implements OnInit {
  @Output() updated = new EventEmitter<void>();
  characters: ICharacter[] = [];
  currentPage: number = 1;
  currentCharacterId?: number;
  currentCharacter?: ICharacter;
  currentTheme!: ETheme;
  totalPages: number = 0;
  headingCharacters = {
    iconDark: '../../../../assets/icons/smiley-dark.svg',
    iconLight: '../../../../assets/icons/smiley-light.svg',
    textContent: 'Mais personagens',
  };

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.loadCharacters(this.currentPage);
    this.characterService.getTotalPages().subscribe((pages) => {
      this.totalPages = pages;
    });
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  onCardDetailRequested(event: { type: string; id: number }) {
    this.router.navigate([`/${event.type}`, event.id]);

    this.currentCharacterId = event.id;
    this.getCharacterById(this.currentCharacterId);
  }

  getCharacterById(id: number) {
    this.characterService.getCharacterById(id).subscribe((character) => {
      this.currentCharacter = character as ICharacter;
    });
  }

  loadCharacters(page: number) {
    this.characterService.getCharactersForPage(page).subscribe((characters) => {
      this.characters = characters;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCharacters(this.currentPage);
  }
  refreshFavorites() {
    this.updated.emit();
  }
}
