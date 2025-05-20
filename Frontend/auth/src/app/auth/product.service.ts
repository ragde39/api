import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable, catchError, throwError, map } from "rxjs";
import {
  Product,
  ProductResponse,
} from "../shared/interfaces/product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}
  // 🔥 Método privado para obtener headers (antes faltaba)
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ "Content-Type": "application/json" });
  }
  register(product: Product): Observable<ProductResponse> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    console.log("URL de la API:", this.apiUrl);
    console.log("Producto a registrar:", JSON.stringify(product));

    return this.http
      .post<ProductResponse>(`${this.apiUrl}/register`, product, {
        headers,
      })

      .pipe(
        catchError((error) => {
          console.error("Error en el servicio:", error);
          throw error;
        })
      );
  }
  // metodo put para modificar productos
  // product.service.ts
  update(product: Product): Observable<ProductResponse> {
    const headers = this.getHeaders();

    // Verificar que el _id existe (usando notación de corchete para TypeScript)
    if (!product["_id"]) {
      return throwError(() => new Error("ID de producto es requerido"));
    }

    // Extraer el _id y el resto de propiedades
    const productId = product["_id"];
    const { ["_id"]: _, ...productData } = product; // Extracción segura

    return this.http
      .put<ProductResponse>(
        `${this.apiUrl}/update/${productId}`,
        productData, // Enviamos solo los datos del producto
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error("Error detallado:", error);
          if (error.status === 500) {
            console.error("Error del servidor:", error.error);
          }
          return throwError(() => new Error("Error al actualizar producto"));
        })
      );
  }

  //meetodo Delete

  productDelete(id: string): Observable<ProductResponse> {
    const headers = this.getHeaders();

    return this.http
      .delete<ProductResponse>(`${this.apiUrl}/delete/${id}`, { headers })
      .pipe(
        catchError((error) => {
          console.error(`Error al eliminar producto con ID ${id}:`, error);
          throw error;
        })
      );
  }

  //metodo Put "listar"
  getProducts(): Observable<ProductResponse[]> {
    return this.http.get<{ data: ProductResponse[] }>(this.apiUrl).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error("Error en la petición:", error);
        return throwError(() => new Error("Error al cargar productos"));
      })
    );
  }
}
