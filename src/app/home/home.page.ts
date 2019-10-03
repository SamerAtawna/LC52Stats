import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Rest } from '../user';
import { DataService } from '../data.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  items: Observable<any[]>;
  Rests: Rest[];
  counter = 0;
  logo = 'assets/nn.png';
  today = new Date();
  todayFormatted = `${this.today.getDate()}/${this.today.getMonth() + 1}/${this.today.getFullYear()}`;
  counterObj: any[] = [];
  constructor(
    private afs: AngularFirestore,
    private dt: DataService,
    private loading: LoadingController
  ) {}
  async presentLoading() {
    const loading = await this.loading.create({
      message: 'טוען מידע...'
    });
    await loading.present();
  }
  async getD() {
    return new Promise((res, rej) => {
      return this.dt.getData().subscribe(d => {
        console.log(d);
        this.Rests = d;
        res();
      });
    });
  }
  getCounters() {
    this.presentLoading()
      .then(async () => {
        await this.getD().then(() => {
          console.log('finished');
          this.loading.dismiss();
        });
      })
      .then(() => {});
  }
  ionViewDidEnter() {
    this.getCounters();
  }
}
