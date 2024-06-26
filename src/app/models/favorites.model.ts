import { ICharacter } from './character.model';
import { IEpisode } from './episode.model';
import { ILocation } from './location.model';

export interface IFavorites {
  characters?: ICharacter[];
  episodes?: IEpisode[];
  locations?: ILocation[];
}
