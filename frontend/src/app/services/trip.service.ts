import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:5000/api/trips';

  constructor(private http: HttpClient) {}

  createTrip(trip: any): Observable<any> {
    return this.http.post(this.apiUrl, trip);
  }

  getTrips(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getTripById(id: string): Observable<any> {
    console.log(id);
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
}
