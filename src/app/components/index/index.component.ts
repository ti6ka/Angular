import {Component} from '@angular/core';
import {IndexService} from '../../services/index.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  model: any = {};
  constructor(private indexService: IndexService, private router: Router) { }

  login(): void {
    this.indexService.login(this.model);
  }

  logout(): void {
    this.indexService.logout();
  }
}
