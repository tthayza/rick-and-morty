import { Component } from '@angular/core';
import { ILocation } from '../../../models/location.model';
import { LocationService } from '../../../services/location.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [],
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.scss',
})
export class LocationsListComponent {
  locations: ILocation[] = [];
  page: number = 1;

  locations$: Observable<ILocation[]> = this.locationService.locations$;

  constructor(private locationService: LocationService) {}
}
