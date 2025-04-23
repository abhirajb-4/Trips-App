import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingUrl = 'http://localhost:5000/api/booking';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log(token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  createOrder(data: { amount: number }) {
    return this.http.post<any>(`${this.bookingUrl}/create-order`, data);
  }

  confirmBooking(payload: any): Observable<any> {
    console.log('payload');
    console.log(payload);
    return this.http.post(`${this.bookingUrl}/confirm-booking`, payload, {
      headers: this.getHeaders()
    });
  }
}
