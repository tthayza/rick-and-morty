import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CharacterService } from '../../../services/character.service';
import { ICharacter } from '../../../models/character.model';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent {
  constructor(
    private characterService: CharacterService,
    private router: ActivatedRoute
  ) {}

  currentCharacter?: ICharacter[];
  currentId?: number;
  elementType?: string;

  ngOnInit() {
    this.elementType = this.router.snapshot.url[0].path;
    this.loadFirstCharacter();
    this.router.paramMap.subscribe((params) => {
      if (+params.get('id')! === 0) {
        this.currentId = 1;
      } else {
        this.currentId = +params.get('id')!;
      }
      console.log('id', this.currentId);
      this.characterService
        .getCharacterById(this.currentId)
        .subscribe((character) => {
          this.currentCharacter = [character];
          console.log('cur', this.currentCharacter);
        });
    });
    // const id = this.router.snapshot.paramMap.get('id');
    // if (id) {
    //   this.characterService.getCharacterById(+id).subscribe((character) => {
    //     this.currentCharacter = [character];
    //   });
    // }
  }

  loadFirstCharacter(page = 1) {
    this.characterService.getCharactersForPage(page).subscribe((characters) => {
      if (characters.length > 0) {
        const firstCharacter = characters[0];
        console.log(firstCharacter);
        this.currentCharacter = [firstCharacter];
      }
    });
  }

  getCharacterById(id: number) {
    this.characterService.getCharacterById(id).subscribe((character) => {
      this.currentCharacter = [character];
    });
  }
}
