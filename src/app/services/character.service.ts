import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICharacter } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getAllCharacters(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?page=${page}`);
  }

  getCharacterById(id: number): Observable<ICharacter> {
    return this.http.get<ICharacter>(`${this.apiUrl}/${id}`);
  }

  getMultipleCharacters(ids: number[]): Observable<ICharacter[]> {
    const idsParam = ids.join(',');
    return this.http.get<ICharacter[]>(`${this.apiUrl}/${idsParam}`);
  }
}
