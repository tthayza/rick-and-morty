import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ILocation } from '../../../models/location.model';
import { LocationService } from '../../../services/location.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CardListingComponent } from '../../../components/card-listing/card-listing.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { BannerComponent } from '../../../components/banner/banner.component';
import { EpisodeDetailComponent } from '../../episodes/episode-detail/episode-detail.component';
import { LocationDetailComponent } from '../location-detail/location-detail.component';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [
    BannerComponent,
    RouterLink,
    RouterLinkActive,
    CardListingComponent,
    PaginationComponent,
    LocationDetailComponent,
  ],
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.scss',
})
export class LocationsListComponent implements OnInit {
  @Output() updated = new EventEmitter<void>();
  currentLocationId?: number = 1;
  currentLocation?: ILocation;
  locations: ILocation[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  headingEpisodes = {
    iconDark: '../../../../assets/icons/play-dark.svg',
    iconLight: '../../../../assets/icons/play-light.svg',
    textContent: 'Mais episódios',
  };

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadLocations(this.currentPage);
    this.locationService.getTotalPages().subscribe((pages) => {
      this.totalPages = pages;
    });
  }

  onCardDetailRequested(event: { type: string; id: number }) {
    this.router.navigate([`/${event.type}`, event.id]);

    this.currentLocationId = event.id;
    this.getLocationById(this.currentLocationId);
  }

  getLocationById(id: number) {
    this.locationService.getLocationById(id).subscribe((location) => {
      this.currentLocation = location as ILocation;
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
  refreshFavorites() {
    this.updated.emit();
  }
}
