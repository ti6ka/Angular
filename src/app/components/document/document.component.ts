import {Component, ElementRef, OnInit} from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {Agent} from '../../models/agent';
import {Driver} from '../../models/driver';
import {AgentService} from '../../services/agent.service';
import {Product} from '../../models/product';
import {Document} from '../../models/document';
import {DriverService} from '../../services/driver.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documents: Document[];
  agent: Agent;
  agents: Agent[];
  driver: Driver;
  drivers: Driver[];
  model: any = {};
  products: Product[] = [];
  pageurl: Uint8Array;

  constructor(private documentService: DocumentService, private agentService: AgentService, private driverService: DriverService) {}

  ngOnInit() {
    this.getAllDocuments();
    this.getAllAgents();
    this.getAllDrivers();
  }

  getAllDocuments() {
    this.documentService.getAllDocuments()
      .then(res => { this.documents = res; })
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

  getDocumentByIdInPDF(id: number, filename: string, type: string) {
    this.documentService.getDocumentByIdInPDF(id, filename, type);
  }
  getDocumentByIdInExcel(id: number, filename: string, type: string) {
    this.documentService.getDocumentByIdInExcel(id, filename, type);
  }

  showDocument(id: number, filename: string, type: string) {
    this.documentService.showDocument(id, filename, type)
      .then(res => { this.pageurl = res; })
      .catch(err => err.toString());
  }

  printDocument(id: number, filename: string, type: string) {
    this.documentService.printDocument(id, filename, type);
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
    this.documentService.addDocumentTN(this.agent.id, this.products)
      .then(res => { this.getAllDocuments(); })
      .catch(err => err.toString());
  }

  deleteDocument(id: number) {
    this.documentService.deleteDocument(id)
      .then(() => { this.getAllDocuments(); })
      .catch(err => err.toString());
  }
}
