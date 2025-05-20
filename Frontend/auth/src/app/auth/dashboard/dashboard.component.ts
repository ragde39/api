import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { StackProductosComponent } from "../stack-productos/stack-productos.component";

@Component({
  selector: "app-dashboard",
  imports: [HeaderComponent, FooterComponent, StackProductosComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {}
