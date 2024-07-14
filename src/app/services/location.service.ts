import { ILocation } from './../models/location.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { IEpisode } from '../models/episode.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'https://rickandmortyapi.com/api/location';
  private locationsSubject = new BehaviorSubject<{
    [page: number]: ILocation[];
  }>([]);
  private totalPagesSubject = new BehaviorSubject<number>(0);
  locations$ = this.locationsSubject.asObservable();
  totalPages$ = this.totalPagesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllLocations(page: number = 1): Observable<ILocation[]> {
    const currentPages = this.locationsSubject.getValue();
    if (currentPages[page]) {
      return of(currentPages[page]);
    }

    return this.getLocationsPage(page).pipe(
      tap((response) => {
        const updatedPages = { ...currentPages, [page]: response.results };
        this.locationsSubject.next(updatedPages);
        if (this.totalPagesSubject.getValue() === 0) {
          this.totalPagesSubject.next(response.info.pages);
        }
      }),
      map((response) => response.results)
    );
  }

  getLocationsForPage(page: number): Observable<ILocation[]> {
    return this.getAllLocations(page);
  }

  private getLocationsPage(
    page: number
  ): Observable<{ info: any; results: ILocation[] }> {
    const url = `${this.apiUrl}/?page=${page}`;
    return this.http.get<{ info: any; results: ILocation[] }>(url);
  }

  getLocationById(id: number): Observable<ILocation> {
    return this.http.get<ILocation>(`${this.apiUrl}/${id}`);
  }

  getMultipleLocations(ids: number[]): Observable<ILocation[]> {
    const currentLocations = Object.values(
      this.locationsSubject.getValue()
    ).flat();

    if (currentLocations.length > 0) {
      const filteredLocations = currentLocations.filter((location: ILocation) =>
        ids.includes(location.id)
      );
      return of(filteredLocations);
    }
    const idsParam = ids.join(',');
    return this.http
      .get<ILocation[]>(`${this.apiUrl}/${idsParam}`)
      .pipe(
        map((response) => (Array.isArray(response) ? response : [response]))
      );
  }

  getTotalPages(): Observable<number> {
    if (this.totalPagesSubject.getValue() > 0) {
      return this.totalPages$;
    }

    return this.getLocationsPage(1).pipe(
      tap((response) => {
        this.totalPagesSubject.next(response.info.pages);
      }),
      map((response) => response.info.pages)
    );
  }
}
