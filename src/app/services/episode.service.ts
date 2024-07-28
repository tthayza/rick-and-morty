import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { IEpisode } from '../models/episode.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private apiUrl = 'https://rickandmortyapi.com/api/episode';
  private episodesSubject = new BehaviorSubject<{
    [page: number]: IEpisode[];
  }>([]);
  episodes$ = this.episodesSubject.asObservable();
  private totalPagesSubject = new BehaviorSubject<number>(0);
  totalPages$ = this.totalPagesSubject.asObservable();
  constructor(private http: HttpClient) {}

  getAllEpisodes(page: number = 1): Observable<IEpisode[]> {
    const currentPages = this.episodesSubject.getValue();
    if (currentPages[page]) {
      return of(currentPages[page]);
    }

    return this.getEpisodesPage(page).pipe(
      tap((response) => {
        const updatedPages = { ...currentPages, [page]: response.results };
        this.episodesSubject.next(updatedPages);
        if (this.totalPagesSubject.getValue() === 0) {
          this.totalPagesSubject.next(response.info.pages);
        }
      }),
      map((response) => response.results)
    );
  }

  getEpisodesForPage(page: number): Observable<IEpisode[]> {
    return this.getAllEpisodes(page);
  }

  private getEpisodesPage(
    page: number
  ): Observable<{ info: any; results: IEpisode[] }> {
    const url = `${this.apiUrl}/?page=${page}`;
    return this.http.get<{ info: any; results: IEpisode[] }>(url);
  }

  getEpisodeById(id: number): Observable<IEpisode> {
    return this.http.get<IEpisode>(`${this.apiUrl}/${id}`);
  }

  getMultipleEpisodes(ids: number[]): Observable<IEpisode[]> {
    const currentEpisodes = Object.values(
      this.episodesSubject.getValue()
    ).flat();

    if (currentEpisodes.length > 0) {
      const filteredEpisodes = currentEpisodes.filter((episode: IEpisode) =>
        ids.includes(episode.id)
      );
      return of(filteredEpisodes);
    }
    const idsParam = ids.join(',');
    return this.http
      .get<IEpisode[]>(`${this.apiUrl}/${idsParam}`)
      .pipe(
        map((response) => (Array.isArray(response) ? response : [response]))
      );
  }

  getTotalPages(): Observable<number> {
    if (this.totalPagesSubject.getValue() > 0) {
      return this.totalPages$;
    }

    return this.getEpisodesPage(1).pipe(
      tap((response) => {
        this.totalPagesSubject.next(response.info.pages);
      }),
      map((response) => response.info.pages)
    );
  }

  filterEpisodes(valueName: string): Observable<IEpisode[]> {
    if (!valueName) {
      return of([]);
    }
    const url = `${this.apiUrl}/?name=${encodeURIComponent(valueName)}`;
    return this.http
      .get<{ info: any; results: IEpisode[] }>(url)
      .pipe(map((response) => response.results || []));
  }
}
