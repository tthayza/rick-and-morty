import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { ETheme } from '../../enums/theme.enum';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent, NgFor, NgClass, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  visiblePages: number[] = [];
  pagesPerGroup: number = 4;
  currentTheme!: ETheme;
  arrowIcons = {
    right: {
      light: '../../../assets/icons/caret-right-light.svg',
      dark: '../../../assets/icons/caret-right-dark.svg',
    },
    left: {
      light: '../../../assets/icons/caret-left-light.svg',
      dark: '../../../assets/icons/caret-left-dark.svg',
    },
  };
  currentArrows = {
    left: this.arrowIcons.left.light,
    right: this.arrowIcons.right.light,
  };

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.visiblePages = [1, 2, 3, 4];
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.updateIconBasedOnTheme();
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
      this.updateVisiblePages();
    }
  }

  updateVisiblePages() {
    const startPage =
      Math.floor((this.currentPage - 1) / this.pagesPerGroup) *
        this.pagesPerGroup +
      1;
    const endPage = Math.min(
      startPage + this.pagesPerGroup - 1,
      this.totalPages
    );
    this.visiblePages = [];

    for (let i = startPage; i <= endPage; i++) {
      this.visiblePages.push(i);
    }
  }

  previousGroup() {
    if (this.currentPage > 1) {
      if (this.currentPage === this.visiblePages[0]) {
        this.currentPage = this.visiblePages[0] - 1;
        this.changePage(this.currentPage);
        this.updateVisiblePages();
      } else {
        this.changePage(this.currentPage - 1);
      }
    }
  }

  nextGroup() {
    if (this.currentPage < this.totalPages) {
      console.log('é maior', this.currentPage < this.totalPages);
      if (
        this.currentPage === this.visiblePages[this.visiblePages.length - 1]
      ) {
        console.log(
          'if 2 lenght -1',
          this.visiblePages[this.visiblePages.length - 1]
        );
        this.currentPage = this.visiblePages[this.visiblePages.length - 1] + 1;
        this.changePage(this.currentPage);
        this.updateVisiblePages();
      } else {
        this.changePage(this.currentPage + 1);
      }
    }
  }
  updateIconBasedOnTheme() {
    this.currentArrows.left =
      this.currentTheme == ETheme.LightTheme
        ? this.arrowIcons.left.light
        : this.arrowIcons.left.dark;
    this.currentArrows.right =
      this.currentTheme == ETheme.LightTheme
        ? this.arrowIcons.right.light
        : this.arrowIcons.right.dark;
  }
}
