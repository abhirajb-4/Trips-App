import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddTripComponent } from './pages/add-trip/add-trip.component';
import { TripsComponent } from './pages/trips/trips.component';
import { TripDetailsComponent } from './pages/trips/trip-details/trip-details.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        component:HomeComponent
    },
    {
        path:'add-trip',
        component : AddTripComponent
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
    }
    
];
