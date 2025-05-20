import { Component } from '@angular/core';
import { HeaderComponent } from '../../auth/header/header.component';
import { FooterComponent } from '../../auth/footer/footer.component';

@Component({
  selector: 'app-index',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {}
