import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnyRecord } from 'dns';

@Component({
  selector: 'app-trip-card',
  imports: [RouterLink],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {
  @Input() trip: any;
}
