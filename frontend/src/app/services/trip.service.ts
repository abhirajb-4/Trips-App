import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:5000/api/trips';

  constructor(private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  createTrip(trip: any): Observable<any> {
    return this.http.post(this.apiUrl, trip, {
      headers: this.getHeaders()
    });
  }

  getTrips(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getTripById(id: string): Observable<any> {
    console.log(id);
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
}
