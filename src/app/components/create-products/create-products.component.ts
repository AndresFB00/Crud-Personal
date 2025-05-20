import { Component, EventEmitter, Output, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../services/list.service';
import { CreateService } from '../../services/create.service'; 
import { EditService } from '../../services/edit.service';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit, OnChanges {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() productData?: Product;
  // estados de crear y editar
  @Output() productCreated = new EventEmitter<Product>();
  @Output() productEdited = new EventEmitter<Product>();

  //data para iniciarlizar el formulario
  product = {
    name: '',
    price: 0,
    stock: 0,
    category: '',
    description: ''
  };
  
  categories = [
    'Electrónica',
    'Hogar',
    'Deporte',
    'Electrodomésticos',
    'Tecnología'
  ];

  constructor(
    private createService: CreateService,
    private editService: EditService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Modo:', this.mode); 
  }

  //detectar cambios de la data
  ngOnChanges(changes: SimpleChanges) {
    if (this.mode === 'edit' && changes['productData'] && this.productData) {
      this.product = {
        name: this.productData.name,
        price: this.productData.price,
        stock: this.productData.stock,
        category: this.productData.categoryName,
        description: this.productData.description
      };
    }
  }

  submit() {
    const payload = {
      name: this.product.name,
      price: this.product.price,
      stock: this.product.stock,
      description: this.product.description,
      categoryId: this.getCategoryId(this.product.category)
    };
    // logica para editar
    if (this.mode === 'edit' && this.productData) {
      this.editService.updateProduct({ ...payload, id: this.productData.id }).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Producto actualizado',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.productEdited.emit({ ...payload, id: this.productData!.id, categoryName: this.product.category });
            this.router.navigate(['']);
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar producto',
            text: 'Intenta nuevamente'
          });
        }
      });
    } else {
      // Lógica para crear
      this.createService.createProduct(payload).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Producto creado',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.productCreated.emit(payload as Product);
            this.router.navigate(['']);
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear producto',
            text: 'Intenta nuevamente'
          });
        }
      });
    }
  }

  getCategoryId(category: string): number {
    const map: Record<string, number> = {
      'Electrónica': 1,
      'Hogar': 2,
      'Deporte': 3,
      'Electrodomésticos': 4,
      'Tecnología': 5
    };
    return map[category] || 0;
  }
}
