import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IEpisode } from '../models/episode.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private apiUrl = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) {}

  getAllEpisodes(page: number = 1): Observable<IEpisode[]> {
    return this.http
      .get<{ info: any; results: IEpisode[] }>(`${this.apiUrl}/?page=${page}`)
      .pipe(map((response) => response.results));
  }
  getEpisodeById(id: number): Observable<IEpisode> {
    return this.http.get<IEpisode>(`${this.apiUrl}/${id}`);
  }

  getMultipleEpisodes(ids: number[]): Observable<IEpisode[]> {
    const idsParam = ids.join(',');
    return this.http.get<IEpisode[]>(`${this.apiUrl}/${idsParam}`);
  }
}
