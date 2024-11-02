import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


const TOKEN_KEY = "AuthToken";


@Injectable({
 providedIn: 'root'
})
export class TokenService {


 constructor(private router: Router) { }
}
