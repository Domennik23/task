import { Injectable } from '@angular/core';
import { DataItem } from '../interfaces/DataItem';
import data from '../data/data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  fetchData(): Promise<DataItem[]> {
    return new Promise((resolve) => {
      setTimeout(
        () => resolve(data as DataItem[]),
        Math.floor(Math.random() * 1000)
      );
    });
  }
}
