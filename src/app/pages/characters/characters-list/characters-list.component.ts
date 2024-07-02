import { Component } from '@angular/core';
import { ICharacter } from '../../../models/character.model';
import { CharacterService } from '../../../services/character.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent {
  characters: ICharacter[] = [];
  page: number = 1;

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.characterService
      .getAllCharacters()
      .subscribe((data) => console.log('char', data));
  }
}
