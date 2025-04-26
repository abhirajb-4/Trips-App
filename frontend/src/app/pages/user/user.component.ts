import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports:[CommonModule,SidebarComponent,RouterLink],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  trips: any[] = [];
  selected: any = null;
  mode: string = '';

  userLinks = [
    { label: 'Dashboard', path: '/user/dashboard' },
    { label: 'My Trips', path: '/user/trips' },
    { label: 'Profile', path: '/user/profile' }
  ];
  
  sidebarOpen = true;
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  

  constructor(private http: HttpClient,private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user && user._id) {
      this.http.get<any[]>(`http://localhost:5000/api/booking/users/${user._id}`).subscribe(
        res => {
          this.trips = res;
        },
        err => console.error('Error fetching bookings:', err)
      );
    }
  }
}
