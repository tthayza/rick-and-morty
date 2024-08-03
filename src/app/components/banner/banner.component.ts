import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ETheme } from '../../enums/theme.enum';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [ButtonComponent, CommonModule, RouterLink],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Output() theme = new EventEmitter<ETheme>();
  logoRM = '../../../assets/logo-a.svg';
  currentImage = '../../../assets/light-banner.png';

  currentTheme = ETheme.LightTheme;
  bannerIcons = {
    heart: {
      light: '../../../assets/icons/heart-light.svg',
      dark: '../../../assets/icons/heart-dark.svg',
    },
    darkIcon: {
      light: '../../../assets/icons/moon-light.svg',
      dark: '../../../assets/icons/moon-dark.svg',
    },
    lightIcon: {
      light: '../../../assets/icons/sun-light.svg',
      dark: '../../../assets/icons/sun-dark.svg',
    },
  };

  currentMessage =
    this.currentTheme == ETheme.DarkTheme
      ? 'Ai sim, Porr#@%&*'
      : 'Wubba Lubba Dub Dub! Cuidado com os olhos.';

  changeTheme(currentTheme: ETheme) {
    this.theme.emit(currentTheme);
  }
  public toggleTheme(theme: string) {
    if (theme == 'light') {
      this.currentTheme = ETheme.LightTheme;
      this.currentMessage = 'Wubba Lubba Dub Dub! Cuidado com os olhos.';
      this.currentImage = '../../../assets/light-banner.png';
    } else {
      this.currentTheme = ETheme.DarkTheme;
      this.currentMessage = 'Ai sim, Porr#@%&*';
      this.currentImage = '../../../assets/dark-banner.png';
    }
    this.changeTheme(this.currentTheme);
  }
}
