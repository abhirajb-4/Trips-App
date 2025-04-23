import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  trip: any;
  availableSeats = 0;
  costPerPassenger = 0;

  tripService = inject(TripService);
  bookingService = inject(BookingService);


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.bookingForm = this.fb.group({
      passengers: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.tripService.getTripById(tripId).subscribe({
        next: (data) => {
          this.trip = data;
          this.costPerPassenger = this.trip.tripInfo.cost;
          this.availableSeats = this.trip.tripSchedule.capacity - this.trip.tripSchedule.enrolled;
        },
        error: (err) => console.error('Error fetching trip:', err)
      });
    }
  }

  get passengers(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  addPassenger(): void {
    if (this.passengers.length < this.availableSeats) {
      const passenger = this.fb.group({
        name: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        phno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
      });
      this.passengers.push(passenger);
    }
  }
  

  removePassenger(index: number): void {
    this.passengers.removeAt(index);
  }

  totalCost(): number {
    return this.passengers.length * this.costPerPassenger;
  }

  isOverbooked(): boolean {
    return this.passengers.length > this.availableSeats;
  }
  isFullyBooked(): boolean {
    return this.passengers.length == this.availableSeats;
  }

  // Method to trigger Razorpay payment
  payNow(): void {
    const options: any = {
      key: 'rzp_test_Va99OvjJU36gup', // Replace with your Razorpay Test Key ID
      amount: this.totalCost() * 100, // Razorpay expects amount in paisa
      currency: 'INR',
      name: 'Bus Booking',
      description: 'Trip Payment',
      handler: (response: any) => {
        // After successful payment, handle the response and submit to backend
        //console.log(response);
        this.submitBooking(response); // Send booking + payment response to backend
      },
      prefill: {
        name: this.passengers.at(0).value.name,
        contact: this.passengers.at(0).value.phno
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }

  submitBooking(paymentResponse: any): void {
    // Safely get and parse user data
    const userData = localStorage.getItem('token');
    let user = { id: '', name: '', email: '' }; // Default empty user
    
    try {
      if (userData) {
        user = JSON.parse(userData);
      }
    } catch (e) {
      console.error('Error parsing user data:', e);
    }
  
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      payment: paymentResponse,
      booking: this.bookingForm.value,
      tripId: this.trip._id
    };
  
    this.bookingService.confirmBooking(payload).subscribe({
      next: () => alert('Booking confirmed!'),
      error: (err) => {
        console.error('Booking error:', err);
        alert('Payment verification failed');
      }
    });
  }
  
}
