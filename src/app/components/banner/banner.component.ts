import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ETheme } from '../../enums/theme.enum';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [ButtonComponent, CommonModule, RouterLink],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent implements OnInit {
  currentTheme!: ETheme;
  currentMessage = '';
  bannerImages = {
    logoRM: '../../../assets/logo-a.svg',
    currentImage: '../../../assets/light-banner.png',
    heart: '../../../assets/icons/heart-light.svg',
    darkIcon: {
      light: '../../../assets/icons/moon-light.svg',
      dark: '../../../assets/icons/moon-dark.svg',
    },
    lightIcon: {
      light: '../../../assets/icons/sun-light.svg',
      dark: '../../../assets/icons/sun-dark.svg',
    },
  };

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.updateIcons(theme);
    });
  }

  updateIcons(theme: ETheme) {
    if (theme === ETheme.DarkTheme) {
      this.bannerImages.currentImage = '../../../assets/dark-banner.png';
      this.currentMessage = 'Ai sim, Porr#@%&*';
    } else {
      this.bannerImages.currentImage = '../../../assets/light-banner.png';
      this.currentMessage = 'Wubba Lubba Dub Dub! Cuidado com os olhos.';
    }
  }

  public toggleTheme(theme: string) {
    if (theme === 'light') {
      this.themeService.setLightTheme();
      this.updateIcons(ETheme.LightTheme);
    } else {
      this.themeService.setDarkTheme();
      this.updateIcons(ETheme.DarkTheme);
    }
  }
  // @Output() theme = new EventEmitter<ETheme>();
  // logoRM = '../../../assets/logo-a.svg';
  // currentImage = '../../../assets/light-banner.png';

  // // currentTheme = ETheme.LightTheme;
  // currentTheme!: ETheme;
  // currentLightIcon = '../../../assets/icons/sun-light.svg';
  // currentDarkIcon = '../../../assets/icons/moon-light.svg';
  // bannerIcons = {
  //   heart: {
  //     light: '../../../assets/icons/heart-light.svg',
  //     // dark: '../../../assets/icons/heart-dark.svg',
  //   },
  //   darkIcon: {
  //     light: '../../../assets/icons/moon-light.svg',
  //     dark: '../../../assets/icons/moon-dark.svg',
  //   },
  //   lightIcon: {
  //     light: '../../../assets/icons/sun-light.svg',
  //     dark: '../../../assets/icons/sun-dark.svg',
  //   },
  // };
  // constructor(private themeService: ThemeService) {}

  // ngOnInit() {
  //   this.currentTheme = this.themeService.getCurrentTheme();
  //   this.themeService.currentTheme$.subscribe((theme) => {
  //     this.currentTheme = theme;
  //   });
  // }
  // currentMessage =
  //   this.currentTheme == ETheme.DarkTheme
  //     ? 'Ai sim, Porr#@%&*'
  //     : 'Wubba Lubba Dub Dub! Cuidado com os olhos.';

  // ngOnChanges() {
  //   console.log('darkic', this.currentDarkIcon);
  // }
  // public toggleTheme(theme: string) {
  //   console.log('atualllllll', this.currentTheme);
  //   if (theme == 'light') {
  //     this.themeService.setLightTheme();
  //     this.currentMessage = 'Wubba Lubba Dub Dub! Cuidado com os olhos.';
  //     this.currentImage = '../../../assets/light-banner.png';
  //     this.currentLightIcon = this.bannerIcons.lightIcon.light;
  //     this.currentDarkIcon = this.bannerIcons.darkIcon.light;
  //   } else {
  //     this.themeService.setDarkTheme();
  //     this.currentMessage = 'Ai sim, Porr#@%&*';
  //     this.currentImage = '../../../assets/dark-banner.png';
  //     this.currentLightIcon = this.bannerIcons.lightIcon.dark;
  //     this.currentDarkIcon = this.bannerIcons.darkIcon.dark;
  //     console.log('darkicon', this.currentDarkIcon);
  //   }
  // }
}
