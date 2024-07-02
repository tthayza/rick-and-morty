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
  getAllLocations(page: number = 1): void {
    this.http
      .get<{ info: any; results: ILocation[] }>(`${this.apiUrl}/?page=${page}`)
      .pipe(
        map((response) => {
          this.locationsSubject.next(response.results);
        })
      )
      .subscribe();
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
    const idsParam = ids.join(',');
    return this.http.get<ILocation[]>(`${this.apiUrl}/${idsParam}`);
  }
}
