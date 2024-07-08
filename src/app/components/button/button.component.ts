import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
  @Input() textContent!: string;

  currentIcon?: string;

  ngOnInit() {
    this.currentIcon = this.iconDark;
  }
}
