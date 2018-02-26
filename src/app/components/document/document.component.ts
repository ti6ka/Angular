import { Component, OnInit, Renderer2} from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {Agent} from '../../models/agent';
import {AgentService} from '../../services/agent.service';
import {Product} from '../../models/product';

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
  agent_id: number;
  constructor(private documentService: DocumentService, private agentService: AgentService) {}

  ngOnInit() {
    this.getAlldocuments();
    this.getAllAgents();
  }

  getAlldocuments() {
    this.documentService.getAllDocuments()
      .then(res => { this.documents = res; })
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
    console.log(this.products);
  }

  addDocumentTN() {
    this.documentService.addDocumentTN(this.agent.id, this.products)
      .then(() => { this.getAlldocuments(); })
      .catch(err => err.toString());
  }

  deleteDocument(id: number) {
    this.documentService.deleteDocument(id)
      .then(() => { this.getAlldocuments(); })
      .catch(err => err.toString());
  }
}
