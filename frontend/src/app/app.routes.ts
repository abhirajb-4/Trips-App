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

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        component:HomeComponent
    },
    {
        path:'add-trip',
        component : AddTripComponent,
        canActivate:[AuthGuard,AdminGuard]
    },
    {
        path:'trips',
        component:TripsComponent
    },
    {
        path:'view-trip',
        component:TripDetailsComponent
    },
    {
        path:'view-trip/:id',
        component:TripDetailsComponent
    },
    {
        path:'contact',
        component:ContactComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'admin/dashboard',
        component:AdminComponent,
        canActivate:[AuthGuard,AdminGuard]
    },
    {
        path:'user/dashboard',
        component:UserComponent,
        canActivate:[AuthGuard,UserGuard]
    },
    {
        path:'register',
        component:RegisterComponent,
    },
    {
        path: 'book-trip/:id',
        component: BookingComponent,
        canActivate:[AuthGuard,UserGuard],
      }
      
    
];
