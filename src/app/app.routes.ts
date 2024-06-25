import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  { path: 'homepage', component: HomePageComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'episodes', component: EpisodesComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'favorites', component: FavoritesComponent },
];
