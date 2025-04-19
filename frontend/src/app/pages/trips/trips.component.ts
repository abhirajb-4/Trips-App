import { Component, inject } from '@angular/core';
import { TripCardComponent } from "./trip-card/trip-card.component";
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-trips',
  imports: [TripCardComponent],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent {

  tripService = inject(TripService);
  trips: any[] = [];

  ngOnInit(): void {
  this.tripService.getTrips().subscribe({
    next: (data) => this.trips = data,
    error: (err) => console.error(err)
  });
}

}
