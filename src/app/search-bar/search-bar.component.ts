import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchBarComponent {
  searchQuery: string = '';
  @Output() cityChanged = new EventEmitter<string>();

  onSearch() {
    if (this.searchQuery.trim()) {
      this.cityChanged.emit(this.searchQuery.trim());
      console.log('Searching for:', this.searchQuery);
    }
  }
}
