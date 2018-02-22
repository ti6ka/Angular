import {Component, EventEmitter, Output} from '@angular/core';
import {IndexService} from '../../services/index.service';
import {Router} from '@angular/router';
import {DocumentService} from '../../services/document.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private indexService: IndexService, private documentService: DocumentService, private router: Router) { }

  @Output() onClick = new EventEmitter<void>();

  MyDocuments(): void {
    this.documentService.getAllDocuments();
    this.router.navigate(['documents']);
  }

  logout(): void {
    this.indexService.logout();
  }
}
