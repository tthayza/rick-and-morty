import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ETheme } from '../enums/theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<ETheme>(ETheme.LightTheme);
  currentTheme$ = this.currentThemeSubject.asObservable();

  setLightTheme() {
    this.currentThemeSubject.next(ETheme.LightTheme);
  }

  setDarkTheme() {
    this.currentThemeSubject.next(ETheme.DarkTheme);
  }
}
