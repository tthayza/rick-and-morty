import { ILocation } from './../models/location.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'https://rickandmortyapi.com/api/location';
  private locationsSubject = new BehaviorSubject<ILocation[]>([]);
  locations$ = this.locationsSubject.asObservable();
  private locationsPerPage = 14;

  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<ILocation[]> {
    if (this.locationsSubject.getValue().length > 0)
      return this.locationsSubject;
    return this.http.get<{ info: any; results: ILocation[] }>(this.apiUrl).pipe(
      tap((response) => {
        this.locationsSubject.next(response.results);
      }),
      map((response) => response.results)
    );
  }

  getLocationsForPage(page: number): Observable<ILocation[]> {
    return this.locations$.pipe(
      map((locations) => {
        const startIndex = (page - 1) * this.locationsPerPage;
        return locations.slice(startIndex, startIndex + this.locationsPerPage);
      })
    );
  }

  getLocationById(id: number): Observable<ILocation> {
    return this.http.get<ILocation>(`${this.apiUrl}/${id}`);
  }

  getMultipleLocations(ids: number[]): Observable<ILocation[]> {
    if (this.locationsSubject.getValue().length > 0) {
      const filteredLocations = this.locationsSubject
        .getValue()
        .filter((location) => ids.includes(location.id));
      return of(filteredLocations);
    }
    const idsParam = ids.join(',');
    return this.http.get<ILocation[]>(`${this.apiUrl}/${idsParam}`);
  }
}
