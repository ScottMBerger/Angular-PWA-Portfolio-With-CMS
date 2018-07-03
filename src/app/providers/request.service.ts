import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Http, Headers, RequestOptions } from "@angular/http";
import { map } from "rxjs/operators";

interface Image {
  title: string;
  link: string;
  description: string;
  height: number;
  width: number;
}
@Injectable({
  providedIn: "root"
})
export class RequestService {
  clientId = "791c109feadbbd9";
  base = "https://api.imgur.com/3";
  constructor(private http: HttpClient) {}

  headers() {
    const headers = new HttpHeaders();
    headers.append("Authorization", "Client-ID " + this.clientId);

    // const options = new RequestOptions({ headers: headers });
    return { headers: headers };
  }
  get(id: string): Observable<Image[]> {
    const endPoint = "/album/" + id + "/images";
    return this.http
      .get<any>(this.base + endPoint, {
        headers: { Authorization: "Client-ID " + this.clientId }
      })
      .pipe(map(res => res.data));
  }
}
