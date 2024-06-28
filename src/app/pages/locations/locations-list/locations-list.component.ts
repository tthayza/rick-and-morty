import { Component } from '@angular/core';
import { ILocation } from '../../../models/location.model';
import { LocationService } from '../../../services/location.service';

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

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadLocations();
  }
  loadLocations(): void {
    this.locationService.getAllLocations(this.page).subscribe((data) => {
      this.locations = data;
    });
  }
}
