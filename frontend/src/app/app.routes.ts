import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddTripComponent } from './pages/add-trip/add-trip.component';
import { TripsComponent } from './pages/trips/trips.component';
import { TripDetailsComponent } from './pages/trips/trip-details/trip-details.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { RegisterComponent } from './pages/register/register.component';
import { BookingComponent } from './pages/booking/booking.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import {TripDetailComponent} from './components/trip-detail/trip-detail.component'

export const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: HomeComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: 'contact',
      component: ContactComponent,
    },
    {
      path: 'trips',
      component: TripsComponent,
    },
    {
      path: 'view-trip',
      component: TripDetailsComponent,
    },
    {
      path: 'view-trip/:id',
      component: TripDetailsComponent,
    },
    {
      path: 'book-trip/:id',
      component: BookingComponent,
      canActivate: [AuthGuard, UserGuard],
    },
  
    // Admin routes with children
    {
      path: 'admin',
      component: AdminComponent,
      canActivate: [AuthGuard, AdminGuard],
      children: [
        { path: 'dashboard', component: AdminHomeComponent}, 
        { path: 'add-trip', component: AddTripComponent },
        { path: 'trips', component: TripsComponent },
        { path: 'view-trip/:id', component: TripDetailsComponent},
        {
          path: 'view-trip',
          component: TripDetailsComponent,
        },
        { path: 'getAllBookings', component: BookingDetailsComponent},
        { path: 'getAlltrips' , component:TripDetailComponent}
      ],
    },
  
    // User route (you can nest here if needed too)
    {
      path: 'user',
      component: UserComponent,
      canActivate: [AuthGuard, UserGuard],
      children: [
        { path: 'dashboard', component: UserComponent } // Add more children if needed
      ]
    }
  ];
  