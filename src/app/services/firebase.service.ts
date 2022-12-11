import { Injectable, EventEmitter } from '@angular/core';
import { IUser } from '../interfaces/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isSignedIn: EventEmitter<boolean> = new EventEmitter();
  userData: any;
    
  constructor(
    public firebaseAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private router: Router
  ) { 
      this.firebaseAuth.authState.subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });
   }

  async login(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isSignedIn.emit(true);
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigate([""]);
      });
  }

  async register(email: string, password: string) {
    
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.SetUserData(res.user);
        this.isSignedIn.emit(true);
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigate([""]);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  logOut(): void {
    this.isSignedIn.emit(false);
    this.firebaseAuth.signOut();
    localStorage.removeItem("user");
    this.router.navigate([""]);
  }

  checkUserStatus(): void {
    this.firebaseAuth.user.subscribe(user => {
      if (user !== null) {
        this.isSignedIn.emit(true);
      } else {
        this.isSignedIn.emit(false);
      }
    })
  }

  SetUserData(user: any) {
    let userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    let userData: IUser = {
      uid: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

}
