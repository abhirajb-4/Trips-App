import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TripService } from './../../../services/trip.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-trip-detail',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  trip: any;

  tripService = inject(TripService);
  constructor(
    private authService: AuthService,
     private router: Router,
    private route: ActivatedRoute,
    
  ) {}

  ngOnInit(): void {
    // Get the trip ID from the route parameters
    const tripId = this.route.snapshot.paramMap.get('id');
    
    if (tripId) {
      // Fetch the trip details using the ID
      this.tripService.getTripById(tripId).subscribe({
        next: (data) => {
          this.trip = data;
        },
        error: (err) => console.error(err)
      });
    }
  }
  bookNow() {
    if (this.authService.isLoggedIn()) {
      const tripId = this.route.snapshot.paramMap.get('id');
      if(tripId){
      console.log('Booking trip...');
      this.tripService.bookTrip(tripId).subscribe({
        next: res => alert('Trip booked!'),
        error: err => alert('Booking failed')
      });
    }
      // example: this.tripService.enrollToTrip(this.trip.id).subscribe(...)
    } else {
      this.router.navigate(['/login']);
    }
  }
  
}
