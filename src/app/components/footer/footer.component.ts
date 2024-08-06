import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
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

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
