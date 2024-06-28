import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ICharacter } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getAllCharacters(page: number = 1): Observable<ICharacter[]> {
    return this.http
      .get<{ info: any; results: ICharacter[] }>(`${this.apiUrl}/?page=${page}`)
      .pipe(map((response) => response.results));
  }

  getCharacterById(id: number): Observable<ICharacter> {
    return this.http.get<ICharacter>(`${this.apiUrl}/${id}`);
  }

  getMultipleCharacters(ids: number[]): Observable<ICharacter[]> {
    const idsParam = ids.join(',');
    return this.http.get<ICharacter[]>(`${this.apiUrl}/${idsParam}`);
  }
}
