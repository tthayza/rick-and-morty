import { Component, OnInit } from '@angular/core';
import { ICharacter } from '../../../models/character.model';
import { CharacterService } from '../../../services/character.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CardComponent } from '../../../components/card/card.component';
import { CardListingComponent } from '../../../components/card-listing/card-listing.component';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CardComponent, CardListingComponent],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent implements OnInit {
  characters: ICharacter[] = [];
  page: number = 1;

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.characterService
      .getAllCharacters()
      .subscribe((data) => (this.characters = data));
    console.log('chars', this.characters);
  }
}
