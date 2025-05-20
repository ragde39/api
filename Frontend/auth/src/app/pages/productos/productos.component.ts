import { Component } from '@angular/core';
import { FooterComponent } from '../../auth/footer/footer.component';
import { HeaderComponent } from '../../auth/header/header.component';
import { AccesoriosComponent } from '../../auth/accesorios/accesorios.component';
import { Accesorios2Component } from '../../auth/accesorios2/accesorios2.component';
import { Accesorios3Component } from '../../auth/accesorios3/accesorios3.component';
import { ContactComponent } from '../../auth/contact/contact.component';
import { ListProductsComponent } from '../../auth/list-products/list-products.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  imports: [
    FooterComponent,
    HeaderComponent,
    AccesoriosComponent,
    Accesorios2Component,
    Accesorios3Component,
    ContactComponent,
    ListProductsComponent,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {}
//smoth es un valor predeterminado que significa un movimientosuave
//scrollUNtoview hace un movimiento
