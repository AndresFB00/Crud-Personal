import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './list.service';

@Injectable({
  providedIn: 'root'
})
export class GetIdService {
  private apiUrl = 'https://localhost:7192/api/Products';

  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}