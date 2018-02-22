import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';
import {Headers} from '@angular/http';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class DocumentService {
  constructor(private http: Http) { }

  getAllDocuments(): Promise<Document[]> {
    const header = new Headers({ Authorization : Cookie.get('token')});
    header.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/documents/', {headers: header}).toPromise()
        .then((response) => {
          resolve(response.json());
        })
        .catch((error) => {
          resolve(error.json());
        });
    });
  }

  getDocumentById(id: number): Promise<Document> {
    const header = new Headers({ Authorization : Cookie.get('token')});
    header.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/documents/' + id, {headers: header}).toPromise()
        .then((response) => {
          resolve(response.json());
        })
        .catch((error) => {
          resolve(error.json());
        });
    });
  }

  deleteDocument(id: number): Promise<Document> {
    const header = new Headers({ Authorization : Cookie.get('token')});
    header.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:8080/documents/' + id, {headers: header}).toPromise()
        .then((response) => {
          resolve(response.json());
        })
        .catch((error) => {
          resolve(error.json());
        });
    });
  }
}
