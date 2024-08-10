import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { ICharacter } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private charactersSubject = new BehaviorSubject<{
    [page: number]: ICharacter[];
  }>([]);
  private totalPagesSubject = new BehaviorSubject<number>(0);
  characters$ = this.charactersSubject.asObservable();
  totalPages$ = this.totalPagesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllCharacters(page: number = 1): Observable<ICharacter[]> {
    const currentPages = this.charactersSubject.getValue();
    if (currentPages[page]) {
      return of(currentPages[page]);
    }
    return this.getCharactersPage(page).pipe(
      tap((response) => {
        const updatedPages = { ...currentPages, [page]: response.results };
        this.charactersSubject.next(updatedPages);
        if (this.totalPagesSubject.getValue() === 0) {
          this.totalPagesSubject.next(response.info.pages);
        }
      }),
      map((response) => response.results)
    );
  }

  getCharacterById(id: number): Observable<ICharacter> {
    return this.http.get<ICharacter>(`${this.apiUrl}/${id}`);
  }

  getMultipleCharacters(ids: number[]): Observable<ICharacter[]> {
    const currentCharacters = Object.values(
      this.charactersSubject.getValue()
    ).flat();

    if (currentCharacters.length > 0) {
      const filteredCharacters = currentCharacters.filter(
        (character: ICharacter) => ids.includes(character.id)
      );
      return of(filteredCharacters);
    }
    const idsParam = ids.join(',');
    return this.http
      .get<ICharacter[]>(`${this.apiUrl}/${idsParam}`)
      .pipe(
        map((response) => (Array.isArray(response) ? response : [response]))
      );
  }

  private getCharactersPage(
    page: number
  ): Observable<{ info: any; results: ICharacter[] }> {
    const url = `${this.apiUrl}/?page=${page}`;
    return this.http.get<{ info: any; results: ICharacter[] }>(url);
  }

  getCharactersForPage(page: number): Observable<ICharacter[]> {
    return this.getAllCharacters(page);
  }

  getTotalPages(): Observable<number> {
    if (this.totalPagesSubject.getValue() > 0) {
      return this.totalPages$;
    }

    return this.getCharactersPage(1).pipe(
      tap((response) => {
        this.totalPagesSubject.next(response.info.pages);
      }),
      map((response) => response.info.pages)
    );
  }

  filterCharacters(valueName: string): Observable<ICharacter[]> {
    if (!valueName) {
      return of([]);
    }
    const url = `${this.apiUrl}/?name=${encodeURIComponent(valueName)}`;
    return this.http
      .get<{ info: any; results: ICharacter[] }>(url)
      .pipe(map((response) => response.results || []));
  }
}
