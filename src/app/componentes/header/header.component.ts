import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent {
  title = 'Unieventos';
  isLogged = false;
  email: string = '';

  constructor(private tokenService: TokenService) {
    this.tokenService.getAuthStatus().subscribe((status: boolean) => {
      this.isLogged = status;
      this.email = status ? this.tokenService.getEmail() : '';
    });
  }

  public logout() {
    this.tokenService.logout();
  }
}


