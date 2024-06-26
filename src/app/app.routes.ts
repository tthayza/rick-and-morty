import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CharactersListComponent } from './pages/characters/characters-list/characters-list.component';
import { EpisodesListComponent } from './pages/episodes/episodes-list/episodes-list.component';
import { LocationsListComponent } from './pages/locations/locations-list/locations-list.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { CharacterDetailComponent } from './pages/characters/character-detail/character-detail.component';
import { EpisodeDetailComponent } from './pages/episodes/episode-detail/episode-detail.component';
import { LocationDetailComponent } from './pages/locations/location-detail/location-detail.component';

export const routes: Routes = [
  { path: 'homepage', component: HomePageComponent },
  {
    path: 'characters',
    component: CharactersListComponent,
    children: [
      {
        path: ':id',
        component: CharacterDetailComponent,
      },
    ],
  },
  {
    path: 'episodes',
    component: EpisodesListComponent,
    children: [
      {
        path: ':id',
        component: EpisodeDetailComponent,
      },
    ],
  },
  {
    path: 'locations',
    component: LocationsListComponent,
    children: [
      {
        path: ':id',
        component: LocationDetailComponent,
      },
    ],
  },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', redirectTo: '/homepage' },
];
