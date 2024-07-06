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

  getAllEpisodes(): Observable<IEpisode[]> {
    if (this.episodesSubject.getValue().length > 0) return this.episodesSubject;
    return this.http.get<{ info: any; results: IEpisode[] }>(this.apiUrl).pipe(
      tap((response) => {
        this.episodesSubject.next(response.results);
      }),
      map((response) => response.results)
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
    if (this.episodesSubject.getValue().length > 0) {
      const filteredEpisodes = this.episodesSubject
        .getValue()
        .filter((episode) => ids.includes(episode.id));
      return of(filteredEpisodes);
    }
    const idsParam = ids.join(',');
    return this.http.get<IEpisode[]>(`${this.apiUrl}/${idsParam}`);
  }
}
