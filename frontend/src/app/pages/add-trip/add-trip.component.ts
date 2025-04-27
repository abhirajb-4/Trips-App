import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripService } from '../../services/trip.service';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, ValidationErrors } from '@angular/forms';

function dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const startDate = control.get('startDate')?.value;
  const endDate = control.get('endDate')?.value;

  if (!startDate || !endDate) return null;

  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Reset time to 00:00:00 to compare only dates
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (start < today) {
    return { startDateInPast: true };
  }

  if (start > end) {
    return { dateRangeInvalid: true };
  }

  return null;
}

@Component({
  selector: 'app-add-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {
  
  step = 0;
  tripService =inject(TripService);
  tripForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.tripForm = this.fb.group({
      tripInfo: this.fb.group({
        tripName: ['', Validators.required],
        boardingPoint: ['', Validators.required],
        destination: ['', Validators.required],
        cost: [null, [Validators.required, Validators.min(0)]],
      }),
      tripSchedule: this.fb.group({
        startDate: ['', Validators.required],
        startTime: ['', Validators.required],
        endDate: ['', Validators.required],
        endTime: ['', Validators.required],
        capacity: [null, [Validators.required, Validators.min(1)]],
      }, { validators: dateRangeValidator }),
      busDetails: this.fb.group({
        busType: ['', Validators.required],
        busNumber: ['', Validators.required],
      }),
      contactPerson: this.fb.group({
        name: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      }),
      schedule: this.fb.array([])
    });
  }

  get schedule(): FormArray {
    return this.tripForm.get('schedule') as FormArray;
  }

  addSchedule() {
    this.schedule.push(
      this.fb.group({
        time: ['', Validators.required],
        destination: ['', Validators.required]
      })
    );
  }

  removeSchedule(index: number) {
    this.schedule.removeAt(index);
  }

  nextStep() {
    if (this.step < 5) this.step++;
  }

  prevStep() {
    if (this.step > 0) this.step--;
  }

  onSubmit() {
    if (this.tripForm.valid) {
      this.tripService.createTrip(this.tripForm.value).subscribe({
        next: (res) => {
          alert('Trip created successfully!');
          this.tripForm.reset();
          this.step = 0;
          // Optionally, navigate to another page:
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          console.error('Error creating trip:', err);
          let errorMessage = 'An unexpected error occurred.';
          if (err?.error?.message) {
            errorMessage = err.error.message; // Try to get a more specific message from the backend
          } else if (err?.message) {
            errorMessage = err.message;
          }
          alert(`Error creating trip: ${errorMessage}`);
        }
      });
    } else {
      this.tripForm.markAllAsTouched();
      alert('Please ensure all required fields are filled correctly.');
    }
  }
}
