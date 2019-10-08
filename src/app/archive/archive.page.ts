import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { DataService } from "../data.service";
import { DataTablesModule } from "angular-datatables";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MaterialModule } from "../material.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import * as Excel from "exceljs";
import * as fs from "file-saver";
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

  columns = [
    { prop: "Date" },
    { name: "Black", width: 100 },
    { name: "Japan", width: 100 },
    { name: "Power", width: 100 }
  ];
  config;
  constructor(private loading: LoadingController, private data: DataService) {
    
  }

  ngOnInit() {
    this.hist();
  }
  async presentLoading() {
    const loading = await this.loading.create({
      message: "טוען מידע..."
    });
    await loading.present();
  }

  hist() {
    this.presentLoading().then(() => {
  
        this.subscriber = this.data.getHistory().subscribe(d => {
          console.log(d);
          this.resHistory = d;
          this.loading.dismiss();
        });

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
}
