import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Http, RequestOptions, ResponseContentType} from '@angular/http';
import {Headers} from '@angular/http';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Product} from '../models/product';
import {Document} from '../models/document';
import * as FileSaver from 'file-saver';
import {AgentService} from './agent.service';

declare var qz: any;

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

  getDocumentById(id: number, type: string, filename: string): Promise<any> {
    const headers = new Headers({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    options.responseType = ResponseContentType.Blob;
    if (type === 'pdf') {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:8080/documents/' + id + '?format=pdf', options).toPromise()
          .then((response) => {
            FileSaver.saveAs(new Blob([response.blob()]), filename + '.pdf');
          })
          .catch((error) => {
            resolve(error);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:8080/documents/' + id + '?format=' + type, options).toPromise()
          .then((response) => {
            FileSaver.saveAs(new Blob([response.blob()]), filename);
          })
          .catch((error) => {
            resolve(error);
          });
      });
    }
  }

  showDocument(id: number): Promise<Uint8Array> {
    const headers = new Headers({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    options.responseType = ResponseContentType.ArrayBuffer;
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/documents/' + id + '?format=pdf', options).toPromise()
        .then((response) => {
          resolve(new Uint8Array(response.arrayBuffer()));
        })
        .catch((error) => {
          resolve(error);
        });
    });
  }

  printDocument(id: number): Promise<any> {
    const headers = new Headers({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    options.responseType = ResponseContentType.Blob;
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/documents/' + id + '?format=pdf', options).toPromise()
        .then((response) => {
          const blob = new Blob([response.blob()], {type: 'application/pdf'});
          const blobUrl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        })
        .catch((error) => {
          resolve(error);
        });
    });
  }

  addDocumentTN(agent_id: number, products: Product[]): Promise<Document> {
    const header = new Headers({ Authorization : Cookie.get('token')});
    header.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/documents/tn', {agent_id: agent_id, products: products}, {headers: header}).toPromise()
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
