import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CmsService {
  id = "i9f1iwc96kh09vk";
  dataFile = "data.json";
  content: Object;

  constructor(private http: HttpClient) {
    // this.getFile(this.dataFile).subscribe(res => {
    //   console.log("data", res);
    // });
  }

  getLocalFile(fileName: string = this.dataFile) {
    const url = `/assets/${fileName}`;

    return this.http
      .get<any>(url, {
        headers: {}
      })
      .pipe();
  }

  getFile(fileName: string): Observable<any> {
    const base = `https://www.dropbox.com/s`;
    const params = `?dl=0&reject_cors_preflight=true`;
    const url = `${base}/${this.id}/${fileName}${params}`;

    return this.http
      .get<any>(url, {
        headers: {}
      })
      .pipe();
  }
}
