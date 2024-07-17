import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ETheme } from '../../enums/theme.enum';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Output() theme = new EventEmitter<string>();
  logoRM = '../../../assets/logo-a.svg';
  currentTheme = ETheme.LightTheme;
  bannerIcons = {
    heart: {
      light: '../../../assets/icons/heart-light.svg',
      dark: '../../../assets/icons/heart-dark.svg',
    },
    characterImage: {
      light: '../../../assets/light-banner.png',
      dark: '../../../assets/dark-banner.png',
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

  changeTheme() {
    this.theme.emit(this.currentTheme);
  }
  public toggleTheme(theme: string) {
    if (theme == 'light') {
      console.log('entrou dark');
      this.currentTheme = ETheme.LightTheme;
      this.currentMessage = 'Wubba Lubba Dub Dub! Cuidado com os olhos.';
    } else {
      console.log('entrou light');
      this.currentTheme = ETheme.DarkTheme;
      this.currentMessage = 'Ai sim, Porr#@%&*';
    }
    this.changeTheme();
  }
}
