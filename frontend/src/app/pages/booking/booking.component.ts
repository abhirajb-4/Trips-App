import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  bookingForm: FormGroup;
  trip :any;
  tripService = inject(TripService);
  availableSeats = 0;
  costPerPassenger = 0;

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
        next: ((data) => {this.trip = data;
                      this.costPerPassenger = this.trip.tripInfo.cost;
                      this.availableSeats = this.trip.tripSchedule.capacity - this.trip.tripSchedule.enrolled;
                      console.log(this.costPerPassenger,this.availableSeats);
        }),
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
        age: ['', [Validators.required, Validators.min(1),Validators.max(100)]],
        phno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
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
  isFullbooked(): boolean {
    console.log(this.passengers.length > this.availableSeats)
    return this.passengers.length == this.availableSeats;
  }
  isOverbooked(): boolean {
    return this.passengers.length > this.availableSeats;
  }
  submit():void{
    if (this.bookingForm.valid && !this.isOverbooked()) {
      console.log('Booking submitted:', this.bookingForm.value);
      // You can add your booking logic here (e.g., API call)
    }
  }

}
