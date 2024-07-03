import { ICharacter } from './character.model';
import { IEpisode } from './episode.model';
import { ILocation } from './location.model';

export interface IFavoritesElements {
  characters?: ICharacter[];
  episodes?: IEpisode[];
  locations?: ILocation[];
}
