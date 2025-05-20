import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateProductPayload {
  name: string;
  price: number;
  stock: number;
  description: string;
  categoryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private apiUrl = 'https://localhost:7192/api/Products';

  constructor(private http: HttpClient) {}

  createProduct(product: CreateProductPayload): Observable<CreateProductPayload> {
    return this.http.post<CreateProductPayload>(this.apiUrl, product);
  }
}