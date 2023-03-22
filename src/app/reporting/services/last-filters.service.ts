import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LastFiltersService {
  public reportsLastFiltersState: { [key: string]: boolean } = {};

  constructor() {
    this.reportsLastFiltersState = this.getState();
  }

  public updateLastFilterStateById(id: string): boolean {
    if (this.reportsLastFiltersState.hasOwnProperty(id)) {
      this.reportsLastFiltersState[id] = !this.reportsLastFiltersState[id];
    } else {
      this.reportsLastFiltersState[id] = true;
    }
    this.updateState();
    return this.reportsLastFiltersState[id];
  }

  public getReportFilterState(id: string): boolean {
    return this.reportsLastFiltersState[id] || false;
  }

  private getState(): { [key: string]: boolean } {
    return JSON.parse(localStorage.getItem('reportsLastFilters') || '{}');
  }

  private updateState(): void {
    localStorage.setItem('reportsLastFilters', JSON.stringify(this.reportsLastFiltersState));
  }
}
