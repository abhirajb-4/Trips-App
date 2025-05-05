import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router,
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

  payNow(): void {
    const amount = this.totalCost();
  
    // Call backend to create order
    this.bookingService.createOrder({ amount }).subscribe(order => {
      const options: any = {
        key: 'rzp_test_69kRzvitkm0bu3',
        amount: order.amount,
        currency: order.currency,
        name: 'Bus Booking',
        description: 'Trip Payment',
        order_id: order.id, // << Important: use this!
        handler: (response: any) => {
          const paymentResponse = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          };
          this.submitBooking(paymentResponse);
        },
        prefill: {
          name: this.passengers.at(0).value.name,
          contact: this.passengers.at(0).value.phno
        },
        theme: { color: '#3399cc' }
      };
  
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    });
  }
  

  submitBooking(paymentResponse: any): void {
    const payload = {
      payment: paymentResponse,
      booking: this.bookingForm.value,
      tripId: this.trip._id
    };
    this.bookingService.confirmBooking(payload).subscribe({
      next: (() => {
        alert('Booking confirmed!');
        this.router.navigate(['/user/dashboard']);
      }),
      error: (err) => {
        console.error('Booking error:', err);
        alert('Payment verification failed');
      }
    });
  }
}
