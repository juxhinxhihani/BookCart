import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { SiteTheme } from 'src/app/models/customtheme';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ThemePickerComponent implements OnInit {

  currentTheme;

  themes: SiteTheme[] = [
    {
      primary: '#ffbf03',
      accent: '#ffbf03',
      displayName: 'Deep Purple & Amber',
      name: 'deeppurple-amber',
    },
    {
      primary: '#E91E63',
      accent: '#E91E63',
      displayName: 'Indigo & Pink',
      name: 'indigo-pink',
    },
    {
      primary: '#607D8B',
      accent: '#607D8B',
      displayName: 'Pink & Blue-grey',
      name: 'pink-bluegrey',
    },
    {
      primary: '#4CAF50',
      accent: '#4CAF50',
      displayName: 'Purple & Green',
      name: 'purple-green',
    },
  ];

  constructor(public themeService: ThemeService) { }

  ngOnInit() {
    this.installTheme('indigo-pink');
  }

  installTheme(themeName: string) {
    this.currentTheme = this.themes.find(theme => theme.name === themeName);
    if (!this.currentTheme) {
      return;
    }

    this.themeService.setStyle('theme', `${this.currentTheme.name}.css`);
  }
}
