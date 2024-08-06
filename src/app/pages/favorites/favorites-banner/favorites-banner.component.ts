import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites-banner',
  standalone: true,
  imports: [FavoritesBannerComponent, ButtonComponent, RouterLink],
  templateUrl: './favorites-banner.component.html',
  styleUrl: './favorites-banner.component.scss',
})
export class FavoritesBannerComponent {
  bannerIcons = {
    logoRM: '../../../../assets/logo-a.svg',
    banner: '../../../../assets/rick-and-morty-fav.png',
    heart: {
      light: '../../../../assets/icons/heart-light.svg',
      dark: '../../../../assets/icons/heart-dark.svg',
    },
  };
}
