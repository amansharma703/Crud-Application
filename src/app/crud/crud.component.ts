import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  fetchdata: any;
  errorMsg: any;
  closeResult: any;
  btnName: string = "SAVE";
  data = {
    userId: "",
    num: "",
    amt: ""
  }
  checkResponse = false;

  constructor(private http: HttpClient, private toastr: ToastrManager) { }

  ngOnInit() {
    this.btnName;
    // read data on component initialization 
    this.getData();
  }


  getData() {
    this.http.get('http://localhost/crudapp/PHP/select.php').subscribe(
      response => {
        this.fetchdata = response;
        if (this.fetchdata["msg"] == "No record found") {
          this.checkResponse = true;
          console.log("inside if")
        }
        else {
          this.checkResponse = false;
          console.log("inside else")

        }
        // console.log('Response fetched is successful ', response);
      },
      error => {
        // console.log('Error', error);
        this.errorMsg = error;
      }
    );
  }

  // checkResponse() {
  //   return false;
  // }

  doSubmitForm() {
    if (this.data.num == '' || this.data.amt == '') {
      this.showWarning("Fields Cant's be empty :(");
      return;
    }
    if (this.btnName == "UPDATE") {
      this.http.post('http://localhost/crudapp/PHP/update.php', JSON.stringify(this.data), { responseType: 'text' }).subscribe(
        response => {
          // console.log('POST Request is successful ', response);
          this.getData();
          this.showSuccess("Data Updated Succesfully :)");
          this.data = {
            userId: "",
            num: "",
            amt: ""
          }
          this.btnName = "SAVE";
        },
        error => {
          // console.log('Error', error);
          this.errorMsg = error;
        }
      );
    }
    else {
      this.http.post('http://localhost/crudapp/PHP/insert.php', JSON.stringify(this.data), { responseType: 'text' }).subscribe(
        response => {
          // console.log('POST Request is successful ', response);
          this.getData();
          this.showSuccess("Data Inserted Succesfully :)");
          this.data = {
            userId: "",
            num: "",
            amt: ""
          }
        },
        error => {
          // console.log('Error', error);
          this.errorMsg = error;
        }
      );
    }
  }

  deleteData(id: number) {
    this.http.post('http://localhost/crudapp/PHP/delete.php', id).subscribe(
      response => {
        // console.log('Delete Request is successful ', response);
        this.getData();
        this.showSuccess("Data Deleted Succesfully :)");
      },
      error => {
        console.log('Error', error);
        this.errorMsg = error;
      }
    );
  }

  updateData(id: any, num: string, amt: any) {
    // console.log(id, num, amt);
    this.data.num = num;
    this.data.amt = amt;
    this.btnName = "UPDATE";
    this.data.userId = id;
  }

  // Toast function
  showSuccess(msg: string) {
    this.toastr.successToastr(msg, 'Success!');
  }
  showWarning(msg: string) {
    this.toastr.warningToastr(msg, 'Alert!');
  }
}

