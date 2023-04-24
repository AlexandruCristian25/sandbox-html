import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from './product.model';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Productservice {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    let qParams = new HttpParams();
    qParams = qParams.append('key1', 'val1');
    qParams = qParams.append('key2', 'val2');
    return this.http
            .get<{ [key: string]: Product }>(
              'https://sandbox-http-76691-default-rtdb.europe-west1.firebasedatabase.app/products.json',
              {
                headers: new HttpHeaders({ 'myNewHeader': 'test' }),
                params: new HttpParams().set('key1', 'val1'),
              }
              )
            .pipe(map(res => {
              const prodArr: Product[] = [];
              for(let key in res) {
                const obj = {
                  ...res[key],
                  id: key,
                }
                prodArr.push(obj);
                }
                return prodArr;
            }));
  }

  addNewProduct(product: Product) {
    this.http.post<{ name: string }>(
      'https://sandbox-http-76691-default-rtdb.europe-west1.firebasedatabase.app/products.json',
      product,
      ).subscribe(res => {
        console.log('Response from firebase: ', res);
      });
  }

  deleteProducts() {
    return this.http.delete('https://sandbox-http-76691-default-rtdb.europe-west1.firebasedatabase.app/products.json');
  }
}
