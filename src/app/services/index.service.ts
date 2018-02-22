import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';
import { Headers } from '@angular/http';
import {User} from '../models/user';
import {Router} from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class IndexService {
  constructor(private http: Http, private router: Router) { }

  login(user: User): Promise<User> {
    const header = new Headers({ Authorization : 'Basic ' + btoa(user.username + ':' + user.password) });
    header.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/login', JSON.stringify(user), {headers: header}).toPromise()
        .then((response => {
          console.log(response);
          Cookie.set('token', 'Basic ' + btoa(user.username + ':' + user.password));
          this.router.navigate(['/main']);
          return response.json();
        }))
        .catch((error => {
          console.log(error);
          return error.json();
        }));
    });
  }

  logout() {
    this.http.get('http://localhost:8080/logout');
    Cookie.delete('token');
    this.router.navigate(['/index']);
  }
}
