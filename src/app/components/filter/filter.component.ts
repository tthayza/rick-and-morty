import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ETheme } from '../../enums/theme.enum';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() requestFilter = new EventEmitter();
  currentTheme!: ETheme;
  currentSearchIcon = '../../../assets/icons/search-light.svg';
  elements = [
    {
      iconDark: '../../../assets/icons/smiley-dark.svg',
      iconLight: '../../../assets/icons/smile-light.svg',
      name: 'Personagens',
    },
    {
      iconDark: '../../../assets/icons/planet-dark.svg',
      iconLight: '../../../assets/icons/planet-light.svg',
      name: 'Localizações',
    },
    {
      iconDark: '../../../assets/icons/play-dark.svg',
      iconLight: '../../../assets/icons/play-light.svg',
      name: 'Episódios',
    },
  ];
  activeFilter: string = '';

  constructor(private themeService: ThemeService) {}
  ngOnInit() {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.updateIconBasedOnTheme();
    });
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search.emit(target.value);
  }

  onFilter() {
    this.requestFilter.emit();
  }

  toggleFilter(filter: string) {
    if (this.activeFilter === filter) {
      this.activeFilter = '';
    } else {
      this.activeFilter = filter;
    }
    this.filterChange.emit(this.activeFilter);
  }
  updateIconBasedOnTheme() {
    this.currentSearchIcon =
      this.currentTheme === ETheme.LightTheme
        ? '../../../assets/icons/search-light.svg'
        : '../../../assets/icons/search-dark.svg';
  }
}
