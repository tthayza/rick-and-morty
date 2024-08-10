import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { ETheme } from '../../../enums/theme.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-banner',
  standalone: true,
  imports: [
    FavoritesBannerComponent,
    ButtonComponent,
    RouterLink,
    CommonModule,
  ],
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
  currentTheme!: ETheme;
  constructor(private themeService: ThemeService) {}
  ngOnInit() {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
}
