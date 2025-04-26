import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  imports: [CommonModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {
  bookings: any[] = [];
  selected: any = null;
  mode: string = '';


  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings() {
    this.bookingService.getAllBookings().subscribe((res: any) => {
      this.bookings = res.bookings;
    });
  }
}
