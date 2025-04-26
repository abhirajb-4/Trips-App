import { Component, inject } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-details',
  imports: [CommonModule],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.css'
})
export class TripDetailComponent {
  trips: any[] = [];
  selected: any = null;
  mode: 'passengers' | 'trip' | 'schedule' = 'trip';

  tripService = inject(TripService);

  ngOnInit(): void {
    this.getAllTrips();
  }

  getAllTrips() {
    this.tripService.getAllTrips().subscribe((res: any) => {
      this.trips = res;
      console.log(res);
    });
  }

}
