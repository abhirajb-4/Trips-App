import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-admin',
  imports: [SidebarComponent,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  adminLinks = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Add Trip', path: '/admin/add-trip' },
    { label:'View Bookings',path:'/admin/getAllBookings'},
    { label : 'Trips', path: '/admin/getAlltrips'}
  ];
  
  
}
