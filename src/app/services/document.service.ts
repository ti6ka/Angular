import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Product} from '../models/product';
import {Work} from '../models/work';
import * as FileSaver from 'file-saver';
import * as blobUtil from 'blob-util';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {reject} from 'q';

@Injectable()
export class DocumentService {
  secret = 'wjJOcPf4YaxFlkIF';
  constructor(private http: HttpClient) { }

  getAllDocuments(): Promise<any> {
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/documents/', {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  convertExcelToPdf(filename: string, type: string, file: string): Promise<any> {
    const url = 'https://v2.convertapi.com/' + type + '/to/pdf?Secret=' + this.secret;
    const body = { Parameters: [{ Name: 'File', FileValue: { Name: filename + '.' + type, Data: file } }]};
    return new Promise((resolve, reject) => {
      this.http.post(url, body).toPromise()
        .then(data => {
          resolve(data['Files'][0].FileData);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  convertExcelToPng(filename: string, type: string, file: string): Promise<any> {
    const url = 'https://v2.convertapi.com/' + type + '/to/png?Secret=' + this.secret;
    const body = { Parameters: [{ Name: 'File', FileValue: { Name: filename + '.' + type, Data: file } }]};
    return new Promise((resolve, reject) => {
      this.http.post(url, body).toPromise()
        .then(data => {
          resolve(data['Files'][0].FileData);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  convert(id: number, pdf: string, png: string): Promise<any> {
    const url = 'http://localhost:8080/documents/convert/' + id;
    const body = { documentPdf: pdf, documentPng: png };
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.post(url, body, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  downloadPDF(id: number, filename: string): Promise<any> {
    const url = 'http://localhost:8080/documents/' + id + '?type=pdf';
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers, responseType: 'blob'}).toPromise()
        .then(response => {
          FileSaver.saveAs(new Blob([response]), filename + '.pdf');
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  downloadExcel(id: number, filename: string, type: string): Promise<any> {
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/documents/' + id, {headers: headers, responseType: 'blob'}).toPromise()
        .then(response => {
          FileSaver.saveAs(new Blob([response]), filename + '.' + type);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getDocumentByIdInExcel(id: number): Promise<any> {
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/documents/' + id, {headers: headers, responseType: 'blob'}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  showPdf(id: number): Promise<Uint8Array> {
    const url = 'http://localhost:8080/documents/' + id + '?type=pdf';
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers, responseType: 'blob'}).toPromise()
        .then(response => {
          blobUtil.blobToArrayBuffer(response)
            .then(arrayBuff => {
              resolve(new Uint8Array(arrayBuff));
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  showPng(id: number): Promise<Uint8Array> {
    const url = 'http://localhost:8080/documents/' + id + '?type=png';
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers, responseType: 'blob'}).toPromise()
        .then(response => {
          blobUtil.blobToBase64String(response)
            .then((base64String) => {
              resolve(base64String);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  printDocument(id: number): Promise<any> {
    const url = 'http://localhost:8080/documents/' + id + '?type=pdf';
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers, responseType: 'blob'}).toPromise()
        .then((response) => {
          const blobUrl = URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  addDocumentTN(documentName: string, agent_id: number, products: Product[]): Promise<any> {
    const promises1 = [];
    const url = 'http://localhost:8080/documents/tn';
    const body = {documentName: documentName, agent_id: agent_id, products: products};
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.post(url, body, {headers: headers}).toPromise()
        .then(response => {
          this.getDocumentByIdInExcel(response['id'])
            .then(blob => {
              blobUtil.blobToBase64String(blob)
                .then(base64 => {
                  promises1.push(this.convertExcelToPdf(response['name'], response['type'], base64));
                  promises1.push(this.convertExcelToPng(response['name'], response['type'], base64));
                  Promise.all(promises1)
                    .then(result => {
                      this.convert(response['id'], result[0], result[1]);
                    })
                    .catch(error => {
                      reject(error);
                    });
                })
                .catch(error => {
                  reject(error);
                });
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  addDocumentTTN(documentName: string, agent_id: number, driver_id: number, products: Product[]): Promise<any> {
    const promises1 = [];
    const url = 'http://localhost:8080/documents/ttn';
    const body = {documentName: documentName, agent_id: agent_id, driver_id: driver_id, products: products};
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.post(url, body, {headers: headers}).toPromise()
        .then(response => {
          this.getDocumentByIdInExcel(response['id'])
            .then(blob => {
              blobUtil.blobToBase64String(blob)
                .then(base64 => {
                  promises1.push(this.convertExcelToPdf(response['name'], response['type'], base64));
                  promises1.push(this.convertExcelToPng(response['name'], response['type'], base64));
                  Promise.all(promises1)
                    .then(result => {
                      this.convert(response['id'], result[0], result[1]);
                    })
                    .catch(error => {
                      reject(error);
                    });
                })
                .catch(error => {
                  reject(error);
                });
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  addDocumentASPR(documentName: string, agent_id: number, works: Work[]): Promise<any> {
    const promises1 = [];
    const url = 'http://localhost:8080/documents/aspr';
    const body = {documentName: documentName, agent_id: agent_id, works: works};
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.post(url, body, {headers: headers}).toPromise()
        .then(response => {
          this.getDocumentByIdInExcel(response['id'])
            .then(blob => {
              blobUtil.blobToBase64String(blob)
                .then(base64 => {
                  promises1.push(this.convertExcelToPdf(response['name'], response['type'], base64));
                  promises1.push(this.convertExcelToPng(response['name'], response['type'], base64));
                  Promise.all(promises1)
                    .then(result => {
                      this.convert(response['id'], result[0], result[1]);
                    })
                    .catch(error => {
                      reject(error);
                    });
                })
                .catch(error => {
                  reject(error);
                });
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  addDocumentSF(documentName: string, agent_id: number, products: Product[]): Promise<any> {
    const promises1 = [];
    const url = 'http://localhost:8080/documents/sf';
    const body = {documentName: documentName, agent_id: agent_id, products: products};
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.post(url, body, {headers: headers}).toPromise()
        .then(response => {
          this.getDocumentByIdInExcel(response['id'])
            .then(blob => {
              blobUtil.blobToBase64String(blob)
                .then(base64 => {
                  promises1.push(this.convertExcelToPdf(response['name'], response['type'], base64));
                  promises1.push(this.convertExcelToPng(response['name'], response['type'], base64));
                  Promise.all(promises1)
                    .then(result => {
                      this.convert(response['id'], result[0], result[1]);
                    })
                    .catch(error => {
                      reject(error);
                    });
                })
                .catch(error => {
                  reject(error);
                });
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  deleteDocument(id: number): Promise<any> {
    const url = 'http://localhost:8080/documents/' + id;
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.delete(url, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
