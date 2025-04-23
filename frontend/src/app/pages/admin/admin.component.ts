import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-admin',
  imports: [RouterLink, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
