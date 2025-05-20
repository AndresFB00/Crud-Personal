import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  categoryId: number;
  categoryName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrl = 'https://localhost:7192/api/Products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}