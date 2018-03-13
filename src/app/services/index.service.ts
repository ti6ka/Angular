import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {User} from '../models/user';
import {Router} from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class IndexService {
  constructor(private http: HttpClient, private router: Router) { }

  login(user: User): Promise<any> {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(user.username + ':' + user.password),
                                             'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/login', JSON.stringify(user), {headers: headers}).toPromise()
        .then(response => {
          Cookie.set('token', 'Basic ' + btoa(user.username + ':' + user.password));
          this.router.navigate(['/main']);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  logout() {
    this.http.get('http://localhost:8080/logout');
    Cookie.delete('token');
    this.router.navigate(['/index']);
  }
}
