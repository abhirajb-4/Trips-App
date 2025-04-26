import { Component, inject } from '@angular/core';
import { TripCardComponent } from "./trip-card/trip-card.component";
import { TripService } from '../../services/trip.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-trips',
  imports: [TripCardComponent],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent {

  tripService = inject(TripService);
  authService = inject(AuthService);
  trips: any[] = [];

  ngOnInit(): void {
    this.tripService.getTrips().subscribe({
      next: (data) => {
        if (this.authService.isAdmin()) {
          this.trips = data;
        } else {
          console.log(data);
          this.trips = data.filter(
            (trip:any) => trip.tripSchedule.capacity > trip.tripSchedule.enrolled
          );
        }
      },
      error: (err) => console.error(err)
    });
  }

}
