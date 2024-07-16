import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input() currentTheme: string = '';
  logoRM = '../../../assets/logo-a.svg';
  iconsBtn = [
    { dark: '../../../assets/icons/heart-dark.svg' },
    { light: '../../../assets/icons/heart-dark.svg' },
  ];
}
