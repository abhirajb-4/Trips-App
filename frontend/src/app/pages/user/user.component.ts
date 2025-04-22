import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [RouterLink,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  trips: any[] = [];
  constructor(private tripService: TripService) {}

ngOnInit(): void {
  this.tripService.getMyTrips().subscribe({
    next: (data) => {this.trips = data;
      console.log(data);
    },
    error: (err) => console.error(err)
  });
}

}
