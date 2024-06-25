import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEpisode } from '../models/episode.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private apiUrl = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) {}

  getEpisodes(page: number = 1): Observable<{ results: IEpisode[] }> {
    return this.http.get<{ results: IEpisode[] }>(
      `${this.apiUrl}/?page=${page}`
    );
  }
}
