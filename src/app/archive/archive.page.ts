import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { DataService } from "../data.service";
import * as Excel from "exceljs";
import * as fs from "file-saver";
import { Screenshot } from "@ionic-native/screenshot/ngx";
import { AlertController } from "@ionic/angular";
import { Element } from "@angular/compiler";
import { DataTablesModule } from "angular-datatables";
import { NgZone } from "@angular/core";

const myWorkbook = new Excel.Workbook();
@Component({
  selector: "app-archive",
  templateUrl: "./archive.page.html",
  styleUrls: ["./archive.page.scss"]
})
export class ArchivePage implements OnInit {
  resHistory;
  newRes = [];
  subscriber;
  title = "app";
  @ViewChild("dt", { static: false }) sa;

  columnDefs = [
    { headerName: "Date", field: "Date" },
    { headerName: "Black", field: "black" },
    { headerName: "Japan Japan", field: "japan" },
    { headerName: "Power Bowl", field: "power" }
  ];


  columns = [
    { name: "Date", prop: "Date" },
    { name: "Black", width: 80 },
    { name: "Japan", width: 80 },
    { name: "Power", width: 80 }
  ];
  config;
  constructor(
    private loading: LoadingController,
    private data: DataService,
    private screenshot: Screenshot,
    public alertController: AlertController,
    public zone: NgZone
  ) {}

  ngOnInit() {
    this.hist();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: "צילום מסך נשמר",
      buttons: ["OK"]
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loading.create({
      message: "טוען מידע..."
    });
    await loading.present();
  }

  hist() {
    this.presentLoading()
      .then(() => {
        this.subscriber = this.data.getHistory().subscribe(d => {
          console.log(d);
          this.zone.run(() => {
            this.resHistory = d;
          });

          this.loading.dismiss();
        });
      })
      .then(() => {
        this.sa.element.children[0].style.background = "white";
      });
  }
  ionViewWillLeave() {
    this.subscriber.unsubscribe();
  }

  save() {
    // write to a file
    this.presentLoading().then(() => {
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet("Resturant Counters");
      worksheet.columns = [
        { header: "Date", key: "Date", width: 10 },
        { header: "Black", key: "black", width: 32 },
        { header: "Japan Japan", key: "japan", width: 10, outlineLevel: 1 },
        { header: "Power Bowl", key: "power", width: 10, outlineLevel: 1 }
      ];
      this.resHistory.forEach(el => {
        worksheet.addRow(el);
      });

      workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });

        fs.saveAs(blob, "LC52.xlsx");
        this.loading.dismiss();
      });
    });
  }
  goBack() {}
  takes() {
    console.log(this.sa);

    this.screenshot.save("jpg", 80, "myscreenshot.jpg").then(d => {
      console.log(d);
      this.presentAlert();
    });
  }
  ref(e) {}
}
