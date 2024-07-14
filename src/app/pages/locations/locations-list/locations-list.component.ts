import { Component, OnInit } from '@angular/core';
import { ILocation } from '../../../models/location.model';
import { LocationService } from '../../../services/location.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CardListingComponent } from '../../../components/card-listing/card-listing.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CardListingComponent,
    PaginationComponent,
  ],
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.scss',
})
export class LocationsListComponent implements OnInit {
  locations: ILocation[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.loadLocations(this.currentPage);
    this.locationService.getTotalPages().subscribe((pages) => {
      this.totalPages = pages;
    });
  }

  loadLocations(page: number) {
    this.locationService.getLocationsForPage(page).subscribe((locations) => {
      this.locations = locations;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadLocations(this.currentPage);
  }
}
