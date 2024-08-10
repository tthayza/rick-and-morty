import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { ETheme } from '../../enums/theme.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, ButtonComponent, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  bannerIcons = {
    logoRM: '../../../../assets/logo-a.svg',
    arrow: {
      light: '../../../../assets/icons/arrow-up-light.svg',
      dark: '../../../../assets/icons/arrow-up-dark.svg',
    },
    code: '../../../../assets/icons/code.svg',
  };
  currentTheme!: ETheme;

  constructor(private themeService: ThemeService) {}
  ngOnInit() {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
