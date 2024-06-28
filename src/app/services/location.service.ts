import { ILocation } from './../models/location.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'https://rickandmortyapi.com/api/location';

  constructor(private http: HttpClient) {}

  getAllLocations(page: number = 1): Observable<ILocation[]> {
    return this.http
      .get<{ info: any; results: ILocation[] }>(`${this.apiUrl}/?page=${page}`)
      .pipe(map((response) => response.results));
  }
  getLocationById(id: number): Observable<ILocation> {
    return this.http.get<ILocation>(`${this.apiUrl}/${id}`);
  }

  getMultipleLocations(ids: number[]): Observable<ILocation[]> {
    const idsParam = ids.join(',');
    return this.http.get<ILocation[]>(`${this.apiUrl}/${idsParam}`);
  }
}
