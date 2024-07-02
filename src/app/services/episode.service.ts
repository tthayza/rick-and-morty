import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { IEpisode } from '../models/episode.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private apiUrl = 'https://rickandmortyapi.com/api/episode';
  private episodesSubject = new BehaviorSubject<IEpisode[]>([]);
  episodes$ = this.episodesSubject.asObservable();
  private episodesPerPage = 14;
  constructor(private http: HttpClient) {}

  getAllEpisodes(page: number = 1): void {
    this.http
      .get<{ info: any; results: IEpisode[] }>(`${this.apiUrl}/?page=${page}`)
      .pipe(
        map((response) => response.results),
        tap((episodes) => {
          this.episodesSubject.next(episodes);
        }),
        catchError((error) => {
          console.error('Erro ao carregar episódios:', error);
          return of([]);
        })
      );
  }

  getEpisodesForPage(page: number): Observable<IEpisode[]> {
    return this.episodes$.pipe(
      map((episodes) => {
        const startIndex = (page - 1) * this.episodesPerPage;
        return episodes.slice(startIndex, startIndex + this.episodesPerPage);
      })
    );
  }

  getEpisodeById(id: number): Observable<IEpisode> {
    return this.http.get<IEpisode>(`${this.apiUrl}/${id}`);
  }

  getMultipleEpisodes(ids: number[]): Observable<IEpisode[]> {
    const idsParam = ids.join(',');
    return this.http.get<IEpisode[]>(`${this.apiUrl}/${idsParam}`);
  }
}
