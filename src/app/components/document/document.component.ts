import { Component, OnInit, Renderer2} from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {Agent} from '../../models/agent';
import {AgentService} from '../../services/agent.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documents: Document[];
  agents: Agent[];
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

  deleteDocument(id: number) {
    this.documentService.deleteDocument(id);
    this.getAlldocuments();
  }
}
