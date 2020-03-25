import { Component, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { Rest } from "../user";
import { DataService } from "../data.service";
import { LoadingController, AlertController, Platform } from "@ionic/angular";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { AdMobFree, AdMobFreeBannerConfig } from "@ionic-native/admob-free/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  items: Observable<any[]>;
  Rests: Rest[] = [];
  counter = 0;
  total: number = 0;
  logo = "assets/nn.png";
  today = new Date();
  version = "2.5.0";
  todayFormatted = `${this.today.getDate()}/${this.today.getMonth() +
    1}/${this.today.getFullYear()}`;
  counterObj: any[] = [];
  shareData: any[] = [];
  constructor(
    private dt: DataService,
    private loading: LoadingController,
    private social: SocialSharing,
    private zone: NgZone,
    public alertController: AlertController,
    public platform :Platform,
    private admobFree: AdMobFree
  ) {}
  async presentLoading() {
    const loading = await this.loading.create({
      message: "טוען מידע..."
    });
    await loading.present();
  }
  async getD() {
    return new Promise((res, rej) => {
      return this.dt.getData().subscribe(d => {
        this.total = 0;
        console.log(d);
        this.Rests = d;
        d.forEach(s => {
          if (typeof s.Count === "string") {
            this.total += parseInt(s.Count);
          }

          // console.log(typeof s.Count)
        });
        res();
      });
    });
  }
  ionViewWillEnter() {
    console.log("will enter");
    this.platform.ready().then(()=>{
      console.log("oninit")
      const bannerConfig: AdMobFreeBannerConfig = {
        autoShow: true,
        id: "ca-app-pub-2213555762660469/1953203471"
      };
      this.admobFree.banner.config(bannerConfig);
  
      this.admobFree.banner
        .prepare()
        .then(() => {console.log("show ad")})
        .catch(e => console.log(e));
    })
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      message: `מה חדש בגרסא 2.5:<br> שרת גיבוי `,
      buttons: ["OK"],
      cssClass: "rtlAlert"
    });

    await alert.present();
  }
  getCounters() {
    let countDown = setTimeout(() => {
      console.log(this.Rests.length)
      if (this.Rests.length == 0) {
        this.loading.dismiss();
        this.dt.getDataAlter().subscribe(d=>{
          this.total = 0;
            this.Rests = d;
            d.forEach(s => {
              if (typeof s.Count === "string") {
                this.total += parseInt(s.Count);
              }
    
              // console.log(typeof s.Count)
            });
        })
        
      }
    }, 12000);
    this.presentLoading()
      .then(async () => {
        await this.getD().then(() => {
          console.log("finished");
          this.loading.dismiss();
          clearTimeout(countDown);
        });
      })
      .then(() => {});
  }
  ionViewDidEnter() {
    this.zone.run(() => {
      this.getCounters();
    });
    if (localStorage.getItem("isInit") === null) {
      this.presentAlert().then(() => {
        localStorage.setItem("isInit", "true");
      });
    }
  }
  async getShareData() {
    this.shareData = [];
    await this.Rests.forEach(el => {
      console.log(el);
      const obj = {
        name: "",
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
          console.log("el", el);
          shareTxt += `${el.name} : ${el.count}
          `;
          console.log("shareTxt = ", shareTxt);
        });
      })
      .then(() => {
        console.log(shareTxt);
        this.social.shareViaWhatsApp(shareTxt, "", "").then(s => {
          console.log(s);
        });
      });
  }

  emailShare() {
    let shareTxt = ``;
    this.getShareData()
      .then(() => {
        this.shareData.forEach(el => {
          console.log("el", el);
          shareTxt += `${el.name} : ${el.count}
          `;
          console.log("shareTxt = ", shareTxt);
        });
      })
      .then(() => {
        console.log(shareTxt);
        this.social
          .shareViaEmail(shareTxt, "Resturant Counters", ["asd"])
          .then(() => {
            console.log("sent mail");
          })
          .catch(err => {
            console.log(err);
          });
      });
  }

  async showMessage(m) {
    const alert = await this.alertController.create({
      message: m,
      buttons: ["OK"],
      cssClass: "rtlAlert"
    });

    await alert.present();
  }
}
