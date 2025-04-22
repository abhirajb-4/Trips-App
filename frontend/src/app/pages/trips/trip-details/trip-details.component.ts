import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from './../../../services/trip.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  trip: any;
  tripService = inject(TripService);

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.tripService.getTripById(tripId).subscribe({
        next: (data) => this.trip = data,
        error: (err) => console.error('Error fetching trip:', err)
      });
    }
  }

  bookNow(): void {
    if (this.authService.isLoggedIn()) {
      const tripId = this.route.snapshot.paramMap.get('id');
      if (tripId) {
        this.tripService.bookTrip(tripId).subscribe({
          next: () => {
            alert('Trip booked!');
            this.router.navigate(['/user/dashboard']);
          },
          error: () => alert('Booking failed')
        });
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
