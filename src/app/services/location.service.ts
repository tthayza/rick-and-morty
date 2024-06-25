import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILocation } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'https://rickandmortyapi.com/api/location';

  constructor(private http: HttpClient) {}

  getLocations(page: number = 1): Observable<{ results: ILocation[] }> {
    return this.http.get<{ results: ILocation[] }>(
      `${this.apiUrl}/?page=${page}`
    );
  }
}
