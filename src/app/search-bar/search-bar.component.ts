import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = '';
  @Output() cityChanged = new EventEmitter<string>();
  @Output() resetToCurrentLocation = new EventEmitter<void>();

  onSearch() {
    if (this.searchQuery.trim()) {
      this.cityChanged.emit(this.searchQuery.trim());
    }
  }

  onResetToCurrentLocation() {
    this.resetToCurrentLocation.emit();
    this.searchQuery = ''; // Clear the search field
  }
}
