import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ProductService } from "../product.service";
import { Product } from "../../shared/interfaces/product.interface";
import { ProductResponse } from "../../shared/interfaces/product.interface";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-stack-productos",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./stack-productos.component.html",
  styleUrls: ["./stack-productos.component.css"],
})
export class StackProductosComponent {
  isListingProducts: boolean = false;
  products: any[] = []; // Para almacenar los productos //
  saveProduct: FormGroup;
  errorMessage: string = "";
  mensajeExito: string = "";
  showProducts: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private productService: ProductService,
    private cd: ChangeDetectorRef
  ) {
    this.saveProduct = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      price: [0, [Validators.required, Validators.min(0.01)]],
      presentation: ["", [Validators.required, Validators.maxLength(50)]],
      number: [
        1,
        [Validators.required, Validators.min(1), Validators.max(1000)],
      ],
    });
  }
  successMessage: string = "";
  showSuccess: boolean = false;

  onSubmit3(): void {
    console.log(this.saveProduct.value);

    if (this.saveProduct.valid) {
      this.productService
        .register({
          name: this.saveProduct.value.name || "",
          price: this.saveProduct.value.price || 0,
          presentation: this.saveProduct.value.presentation || "",
          number: this.saveProduct.value.number || 0,
        })

        .subscribe({
          next: (response) => {
            console.log("Registro exitoso:", response);
            this.saveProduct.reset();
            // Mostrar mensaje de éxito
            this.successMessage = "¡Registro exitoso!";
            this.showSuccess = true;

            // Ocultar después de 5 segundos
            setTimeout(() => {
              this.showSuccess = false;
              this.successMessage = "";
            }, 5000);
          },
          error: (err) => {
            this.errorMessage = "Error en el registro";
            console.error(err);
          },
        });
    }
  }
  // Método para listar productos
  listProducts() {
    // Alternar el estado de visibilidad
    this.showProducts = !this.showProducts;

    // Si estamos ocultando los productos, simplemente salimos
    if (!this.showProducts) {
      return;
    }

    // Solo realizar la solicitud si los productos aún no han sido cargados
    if (!this.products || this.products.length === 0) {
      this.isListingProducts = true;
      this.productService.getProducts().subscribe({
        next: (data: ProductResponse[]) => {
          this.products = data;
          this.isListingProducts = false;
        },
        error: (err) => {
          this.isListingProducts = false;
          console.error("Error:", err);
        },
      });
    }
  }

  deleteProduct(id: string): void {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      this.productService.productDelete(id).subscribe({
        error: (err) => {
          console.error("Error al eliminar producto:", err);
          alert("Error al eliminar el producto");
        },
      });
    }
  }
}
