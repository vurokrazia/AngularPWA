import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IUser } from '../structures/users';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { UserService } from './users.services';
@Injectable()
export class AuthService {
    constructor(private afAuth: AngularFireAuth, private userS: UserService) {}
    getUser(): Observable<IUser> {
        return this.afAuth.authState
            .take(1)
            .filter(user => !!user)
            .map((user: firebase.User) => {
            return user as IUser;
        });
    }
    login(): Promise<void> {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(result => {
            console.log(result.user.uid);
            console.log(result.user.email );
            return this.userS.add({ uid: result.user.uid, email: result.user.email });
        })
        .catch(console.log);
    }
}