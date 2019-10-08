import { Component, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Rest } from '../user';
import { DataService } from '../data.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

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
  version = '2.0';
  todayFormatted = `${this.today.getDate()}/${this.today.getMonth() +
    1}/${this.today.getFullYear()}`;
  counterObj: any[] = [];
  shareData: any[] = [];
  constructor(
    private dt: DataService,
    private loading: LoadingController,
    private social: SocialSharing,
    private zone: NgZone,
    public alertController: AlertController
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
  async presentAlert() {
    const alert = await this.alertController.create({
      message: `מה חדש בגרסא 2.0:<br> ניתן לראות היסטורית הזמנות `,
      buttons: ['OK'],
      cssClass: 'rtlAlert'
    });

    await alert.present();
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
    this.zone.run(() => {
      this.getCounters();
    });
    if (localStorage.getItem('isInit') === null) {
      this.presentAlert().then(() => {
        localStorage.setItem('isInit', 'true');
      });
    }
  }
  async getShareData() {
    this.shareData = [];
    await this.Rests.forEach(el => {
      console.log(el);
      const obj = {
        name: '',
        count: 0
      };
      obj.name = el.Name;
      obj.count = el.Count;
      this.shareData.push(obj);
    });
    console.log(this.shareData);
  }
  whatsappShare() {
    let shareTxt = ``;
    this.getShareData()
      .then(() => {
        this.shareData.forEach(el => {
          console.log('el', el);
          shareTxt += `${el.name} : ${el.count}
          `;
          console.log('shareTxt = ', shareTxt);
        });
      })
      .then(() => {
        console.log(shareTxt);
        this.social.shareViaWhatsApp(shareTxt, '', '').then(s => {
          console.log(s);
        });
      });
  }

  emailShare() {
    let shareTxt = ``;
    this.getShareData()
      .then(() => {
        this.shareData.forEach(el => {
          console.log('el', el);
          shareTxt += `${el.name} : ${el.count}
          `;
          console.log('shareTxt = ', shareTxt);
        });
      })
      .then(() => {
        console.log(shareTxt);
        this.social
          .shareViaEmail(shareTxt, 'Resturant Counters', ['asd'])
          .then(() => {
            console.log('sent mail');
          })
          .catch(err => {
            console.log(err);
          });
      });
  }
}
