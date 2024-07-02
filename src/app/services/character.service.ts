import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { ICharacter } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private charactersSubject = new BehaviorSubject<ICharacter[]>([]);
  characters$ = this.charactersSubject.asObservable();
  private charactersPerPage = 12;

  constructor(private http: HttpClient) {}

  getAllCharacters(): Observable<ICharacter[]> {
    if (this.charactersSubject.getValue().length > 0)
      return this.charactersSubject;
    return this.http
      .get<{ info: any; results: ICharacter[] }>(this.apiUrl)
      .pipe(
        tap((response) => {
          this.charactersSubject.next(response.results);
        }),
        map((response) => response.results)
      );
  }

  getCharactersForPage(page: number): Observable<ICharacter[]> {
    return this.characters$.pipe(
      map((characters) => {
        const startIndex = (page - 1) * this.charactersPerPage;
        return characters.slice(
          startIndex,
          startIndex + this.charactersPerPage
        );
      })
    );
  }

  getCharacterById(id: number): Observable<ICharacter> {
    return this.http.get<ICharacter>(`${this.apiUrl}/${id}`);
  }

  getMultipleCharacters(ids: number[]): Observable<ICharacter[]> {
    const idsParam = ids.join(',');
    return this.http.get<ICharacter[]>(`${this.apiUrl}/${idsParam}`);
  }
}
