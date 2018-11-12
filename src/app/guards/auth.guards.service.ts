import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private afAuth: AngularFireAuth, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.afAuth.authState.take(1).map((user: firebase.User) => {
            return !!user;
        }).do((authenticated: boolean) => {
            if (!authenticated) this.router.navigate(['/login']);
        });
    }
}
