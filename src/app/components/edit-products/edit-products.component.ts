import { CreateProductsComponent } from '../create-products/create-products.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../services/list.service';
import { GetIdService } from '../../services/get_id.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-products',
  imports: [CreateProductsComponent, CommonModule],
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  productoAEditar?: Product;

  constructor(
    private route: ActivatedRoute,
    private getIdService: GetIdService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getIdService.getProductById(id).subscribe(product => {
      this.productoAEditar = product;
    });
  }
}
