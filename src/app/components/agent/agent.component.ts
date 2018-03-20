import {Component, OnInit} from '@angular/core';
import {Agent} from '../../models/agent';
import {AgentService} from '../../services/agent.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  agents: Agent[];
  agent: Agent = new Agent();
  constructor(private agentService: AgentService) {}

  ngOnInit() {
    this.getAllAgents();
  }

  getAllAgents() {
    this.agentService.getAllAgents()
      .then(res => { this.agents = res; })
      .catch(err => { console.log(err); });
  }

  getAgentById(id: number) {
    this.agentService.getAgentById(id)
      .then(res => {
        this.agent = res;
      })
      .catch(err => err.toString());
  }

  addAgent() {
    this.agentService.addAgent(this.agent)
      .then(res => { this.getAllAgents(); })
      .catch(err => err.toString());
  }

  updateAgent(id: number) {
    this.agentService.updateAgent(id, this.agent)
      .then(res => { this.getAllAgents(); })
      .catch(err => err.toString());
  }

  deleteAgent(id: number) {
    this.agentService.deleteAgent(id)
      .then(res => { this.getAllAgents(); })
      .catch(err => err.toString());
  }
}
