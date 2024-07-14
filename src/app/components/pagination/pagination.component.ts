import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent, NgFor, NgClass],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  visiblePages: number[] = [];
  pagesPerGroup: number = 4;

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

  ngOnInit() {
    this.visiblePages = [1, 2, 3, 4];
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
        this.updateVisiblePages();
      } else {
        this.changePage(this.currentPage - 1);
      }
    }
  }

  nextGroup() {
    if (this.currentPage < this.totalPages) {
      if (
        this.currentPage === this.visiblePages[this.visiblePages.length - 1]
      ) {
        this.currentPage = this.visiblePages[this.visiblePages.length - 1] + 1;
        this.updateVisiblePages();
      } else {
        this.changePage(this.currentPage + 1);
      }
    }
  }
}
