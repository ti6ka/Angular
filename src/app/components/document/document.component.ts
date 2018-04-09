import {Component, ElementRef, OnInit} from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {Agent} from '../../models/agent';
import {Driver} from '../../models/driver';
import {AgentService} from '../../services/agent.service';
import {Product} from '../../models/product';
import {Document} from '../../models/document';
import {DriverService} from '../../services/driver.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  document: Document;
  documents: Document[];
  agent: Agent;
  agents: Agent[];
  driver: Driver;
  drivers: Driver[];
  model: any = {};
  products: Product[] = [];
  pageurl: Uint8Array;
  url: any[] = [];
  elements: any[];

  constructor(private documentService: DocumentService, private agentService: AgentService, private driverService: DriverService) {}

  ngOnInit() {
    this.getAllDocuments();
    this.getAllAgents();
    this.getAllDrivers();
  }

  getAllDocuments() {
    this.documentService.getAllDocuments()
      .then(res => {
        this.documents = res;
        for (let doc of this.documents) {
          this.showPng(doc.id);
          this.elements = this.documents.concat(this.url);
        }
      })
      .catch(err => err.toString());
  }

  getAllAgents() {
    this.agentService.getAllAgents()
      .then(res => { this.agents = res; })
      .catch(err => err.toString());
  }

  getAllDrivers() {
    this.driverService.getAllDrivers()
      .then(res => { this.drivers = res; })
      .catch(err => err.toString());
  }

  downloadPDF(id: number, filename: string) {
    this.documentService.downloadPDF(id, filename);
  }

  downloadExcel(id: number, filename: string, type: string) {
    this.documentService.downloadExcel(id, filename, type);
  }

  showPdf(id: number) {
    this.documentService.showPdf(id)
      .then(res => { this.pageurl = res; })
      .catch(err => err.toString());
  }

  showPng(id: number) {
    this.documentService.showPng(id)
      .then(res => { this.url.push('data:image/png;base64,' + res); })
      .catch(err => err.toString());
  }

  printDocument(id: number) {
    this.documentService.printDocument(id);
  }

  addProduct() {
    const product = new Product();
    product.name = this.model.name;
    product.measure = this.model.measure;
    product.number = this.model.number;
    product.price = this.model.price;
    product.packageNumber = this.model.packageNumber;
    product.weight = this.model.weight;
    product.note = this.model.note;
    this.products.push(product);
  }

  addDocumentTN() {
    this.documentService.addDocumentTN(this.model.documentName, this.agent.id, this.products)
      .then(res => { this.getAllDocuments(); })
      .catch(err => err.toString());
  }

  addDocumentTTN() {
    this.documentService.addDocumentTTN(this.model.documentName, this.agent.id, this.driver.id, this.products)
      .then(res => { this.getAllDocuments(); })
      .catch(err => err.toString());
  }

  deleteDocument(id: number) {
    this.documentService.deleteDocument(id)
      .then(() => { this.getAllDocuments(); })
      .catch(err => err.toString());
  }
}
