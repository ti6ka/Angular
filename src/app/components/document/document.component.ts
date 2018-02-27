import {Component, ElementRef, OnInit} from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {Agent} from '../../models/agent';
import {AgentService} from '../../services/agent.service';
import {Product} from '../../models/product';
import {Document} from '../../models/document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documents: Document[];
  agent: Agent;
  agents: Agent[];
  model: any = {};
  products: Product[] = [];
  constructor(private documentService: DocumentService, private agentService: AgentService) {}

  ngOnInit() {
    this.getAlldocuments();
    this.getAllAgents();
  }

  getAlldocuments() {
    this.documentService.getAllDocuments()
      .then(res => { this.documents = res; console.log(this.documents); })
      .catch(err => err.toString());
  }

  getAllAgents() {
    this.agentService.getAllAgents()
      .then(res => { this.agents = res; })
      .catch(err => err.toString());
  }

  getDocumentById(id: number) {
    this.documentService.getDocumentById(id);
  }

  addProduct() {
    this.products.push(new Product(this.model.name, this.model.measure, this.model.number, this.model.price));
  }

  addDocumentTN() {
    this.documentService.addDocumentTN(this.agent.Id, this.products)
      .then(() => { this.getAlldocuments(); })
      .catch(err => err.toString());
  }

  deleteDocument(id: number) {
    this.documentService.deleteDocument(id)
      .then(() => { this.getAlldocuments(); })
      .catch(err => err.toString());
  }
}
