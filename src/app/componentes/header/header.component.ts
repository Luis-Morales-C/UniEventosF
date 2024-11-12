import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  title = 'Unieventos';
  isLogged: boolean = false;
  email: string = '';
  nombre: string='';
  isAdmin: boolean = false;

  private authStatusSubscription: Subscription;
  private emailSubscription: Subscription;
  private rolSubscription: Subscription;

  constructor(private tokenService: TokenService) {

    this.authStatusSubscription = this.tokenService.getAuthStatus().subscribe(status => {
      this.isLogged = status;
    });

    this.emailSubscription = this.tokenService.getEmailStatus().subscribe(email => {
      this.email = email;
    });

    this.rolSubscription = this.tokenService.getRolStatus().subscribe(rol => {
      this.isAdmin = rol === 'ADMINISTRADOR';
    });
  }

  logout(): void {
    this.tokenService.logout(); 
  }


  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
    this.emailSubscription.unsubscribe();
    this.rolSubscription.unsubscribe();
  }
}

