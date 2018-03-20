import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Agent} from '../models/agent';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AgentService {
  constructor(private http: HttpClient) { }

  getAllAgents(): Promise<any> {
    const url = 'http://localhost:8080/agents/';
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getAgentById(id: number): Promise<any> {
    const url = 'http://localhost:8080/agents/' + id;
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  addAgent(agent: Agent): Promise<any> {
    const url = 'http://localhost:8080/agents/';
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.post(url, agent, {headers: headers}).toPromise()
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  updateAgent(id: number, agent: Agent): Promise<any> {
    const url = 'http://localhost:8080/agents/' + id;
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.put(url, agent, {headers: headers}).toPromise()
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  deleteAgent(id: number): Promise<any> {
    const url = 'http://localhost:8080/agents/' + id;
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.delete(url, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
