import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from './app.service';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public AddUser: any = FormGroup;
  public getUserDetails: any = [];
  @ViewChild('addUserModal') modal: ModalComponent;
  constructor(public fb: FormBuilder, private appService: AppService ) {

      this.AddUser = this.fb.group({
          uname: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          age: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(2), Validators.pattern('^[1-9][0-9]*'), Validators.required])],
          email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[a-zA-Z]{2,4}$'), Validators.required])],
       });
        this.appService.getUserData().subscribe(data => {
          this.getUserDetails = data;
        });
  }
  public add() {
    this.getUserDetails.push(this.AddUser.value);
    //localStorage.setItem('userDetails', JSON.stringify(this.getUserDetails));
    this.AddUser.reset();
    this.modal.close();
    this.appService.setUserData(this.getUserDetails).subscribe((res) => {
      console.log(res.statusText);
    });
  }
  public addUser() {
      this.modal.open();
  }
}
