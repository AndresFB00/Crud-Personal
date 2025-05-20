import { Component, OnInit } from '@angular/core';
import { ListService, Product } from '../../services/list.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DeleteService } from '../../services/delete.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'stock', 'categoryName', 'description', 'actions'];
  dataSource: Product[] = [];

  constructor(
    private listService: ListService,
    private deleteService: DeleteService, 
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.listService.getProducts().subscribe((data) => {
      this.dataSource = data;
    });
  }

  
  createProduct() {
    this.router.navigate(['create']);
  }

  editProduct(product: Product) {
    this.router.navigate(['edit', product.id]);
  }

  deleteProduct(product: Product) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminar "${product.name}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteService.deleteProduct(product.id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
            // Actualiza la lista localmente
            this.dataSource = this.dataSource.filter(p => p.id !== product.id);
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
          }
        });
      }
    });
  }
}
