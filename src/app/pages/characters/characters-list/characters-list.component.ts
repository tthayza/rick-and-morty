import { Component, OnInit } from '@angular/core';
import { ICharacter } from '../../../models/character.model';
import { CharacterService } from '../../../services/character.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CardComponent } from '../../../components/card/card.component';
import { CardListingComponent } from '../../../components/card-listing/card-listing.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { BannerComponent } from '../../../components/banner/banner.component';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [
    BannerComponent,
    RouterLink,
    RouterLinkActive,
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
  characters: ICharacter[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  headingCharacters = {
    iconDark: '../../../../assets/icons/smiley-dark.svg',
    iconLight: '../../../../assets/icons/smiley-light.svg',
    textContent: 'Mais personagens',
  };

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.loadCharacters(this.currentPage);
    this.characterService.getTotalPages().subscribe((pages) => {
      this.totalPages = pages;
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
}
