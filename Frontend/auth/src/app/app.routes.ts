import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DashboardComponent } from "./auth/dashboard/dashboard.component";
import { authGuard } from "./guards/auth.guard";

import { IndexComponent } from "./pages/index/index.component";
import { ProductosComponent } from "./pages/productos/productos.component";
import { StackProductosComponent } from "./auth/stack-productos/stack-productos.component";

export const appRoutes: Routes = [
  { path: "", component: IndexComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "productos", component: ProductosComponent },
  { path: "registerproductos", component: StackProductosComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];
