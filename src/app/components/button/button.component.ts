import { ThemeService } from './../../services/theme.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ETheme } from '../../enums/theme.enum';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() iconLight?: string;
  @Input() iconDark?: string;
  @Input() textContent?: string;
  currentTheme!: ETheme;
  currentIcon?: string;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // this.updateIconBasedOnTheme();
    // this.currentTheme = this.themeService.getCurrentTheme();
    // this.themeService.currentTheme$.subscribe(() => {
    //   this.updateIconBasedOnTheme();
    // });
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.updateIconBasedOnTheme();
    });
  }

  updateIconBasedOnTheme() {
    // const currentTheme = this.themeService.getCurrentTheme();
    this.currentIcon =
      this.currentTheme === ETheme.LightTheme ? this.iconLight : this.iconDark;
  }
}
