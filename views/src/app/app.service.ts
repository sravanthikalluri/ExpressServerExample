
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  constructor(private http: Http) {

  }
  public getUserData() {
    return this.http.get('http://localhost:3000/reqData').map(res => {
      return res.json();
    });
  }
  public setUserData(data: any) {
    return this.http.post('http://localhost:3000/updateData', data).map(res => {
      return res.json();
    });

  }
}
