import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';
import {Headers} from '@angular/http';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Agent} from '../models/agent';

@Injectable()
export class AgentService {
  constructor(private http: Http) { }

  getAllAgents(): Promise<Agent[]> {
    const header = new Headers({ Authorization : Cookie.get('token')});
    header.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/agents/', {headers: header}).toPromise()
        .then((response) => {
          resolve(response.json());
        })
        .catch((error) => {
          resolve(error.json());
        });
    });
  }

  getAgentById(id: number): Promise<Agent> {
    const header = new Headers({ Authorization : Cookie.get('token')});
    header.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/agents/' + id, {headers: header}).toPromise()
        .then((response) => {
          resolve(response.json());
        })
        .catch((error) => {
          resolve(error.json());
        });
    });
  }

  addAgent(agent: Agent): Promise<Agent> {
    const header = new Headers({ Authorization : Cookie.get('token')});
    header.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/agents/', agent, {headers: header}).toPromise()
        .then((response) => {
          resolve(response.json());
        })
        .catch((error) => {
          resolve(error.json());
        });
    });
  }

  updateAgent(id: number, agent: Agent): Promise<Agent> {
    const header = new Headers({ Authorization : Cookie.get('token')});
    header.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:8080/agents/' + id, agent, {headers: header}).toPromise()
        .then((response) => {
          resolve(response.json());
        })
        .catch((error) => {
          resolve(error.json());
        });
    });
  }

  deleteAgent(id: number): Promise<Agent> {
    const header = new Headers({ Authorization : Cookie.get('token')});
    header.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:8080/agents/' + id, {headers: header}).toPromise()
        .then((response) => {
          resolve(response.json());
        })
        .catch((error) => {
          resolve(error.json());
        });
    });
  }
}
