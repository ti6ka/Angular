import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {IndexComponent} from './components/index/index.component';
import {IndexService} from './services/index.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {AuthGuard} from './services/authguard.service';
import {DocumentComponent} from './components/document/document.component';
import {DocumentService} from './services/document.service';
import {AgentService} from './services/agent.service';
import {AgentComponent} from './components/agent/agent.component';

const appRoutes: Routes = [
  { path: 'index', component: IndexComponent},
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'documents', component: DocumentComponent, canActivate: [AuthGuard]},
  { path: 'agents', component: AgentComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MainComponent,
    DocumentComponent,
    AgentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [IndexService, AuthGuard, DocumentService, AgentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
