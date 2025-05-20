import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private apiUrl = 'https://localhost:7192/api/Products';

  constructor(private http: HttpClient) {}


  updateProduct(product: { id: number; name: string; price: number; stock: number; description: string; categoryId: number }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${product.id}`, product);
  }
}