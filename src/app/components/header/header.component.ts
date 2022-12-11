import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSignedIn!: boolean;

  constructor(
    private fb: FirebaseService,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.fb.isSignedIn.subscribe(value => {
      this.isSignedIn = value;
    });
    this.fb.checkUserStatus();

    let user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user).uid;
    }
  }

  logOut(): void {
    this.fb.logOut();
  }

}
