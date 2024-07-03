import { Component, OnInit } from '@angular/core';
import { ILocation } from '../../../models/location.model';
import { LocationService } from '../../../services/location.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CardListingComponent } from '../../../components/card-listing/card-listing.component';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CardListingComponent],
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.scss',
})
export class LocationsListComponent implements OnInit {
  locations: ILocation[] = [];
  page: number = 1;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService
      .getAllLocations()
      .subscribe((data) => (this.locations = data));
    console.log('locs', this.locations);
  }
}
