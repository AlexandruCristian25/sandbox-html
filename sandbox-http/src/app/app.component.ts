import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'


import { Product } from './product.model';
import { Productservice } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('form1') myForm: NgForm | undefined;

  productList: Product[] = [];
  isLoading = false;
  newError = null;

  constructor(private prdService: Productservice) {}

  ngOnInit(): void {
    this.getDataFromServer();
  }

  onSubmit() {
    console.log(this.myForm);
    this.prdService.addNewProduct(this.myForm?.value)
  }

  getDataFromServer() {
    this.isLoading = true;

    this.prdService.getAllProducts().subscribe(products => {
      this.isLoading = false;
      console.log('Receive data:', products);
      this.productList = products;
    }, error => {
      console.log(error);
      this.newError = error.error.error;
    })
  }

  deleteDataFromServer() {
    this.prdService.deleteProducts().subscribe(() => {
      this.productList = [];
    });
  }

}
