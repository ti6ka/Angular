import {Component} from '@angular/core';
import {IndexService} from '../../services/index.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  model: any = {};
  constructor(private indexService: IndexService) { }

  login(): void {
    console.log(this.model);
    this.indexService.login(this.model);
  }

  logout(): void {
    this.indexService.logout();
  }
}
