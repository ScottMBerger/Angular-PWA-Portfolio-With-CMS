import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

interface ContentData {
  title?: string;
  name?: string;
  location?: string;
  phone?: string;
  email?: string;
  info1?: string;
  info2?: string;
  imgurAlbumId?: string;
  themeColor?: string;
  backgroundUrl?: string;
  resumeUrl?: string;
  profileImageUrl?: string;
  googleDescription?: string;
  keywords?: string;
}

@Injectable({
  providedIn: "root"
})
export class CmsService {
  private content = new Subject<ContentData>();
  content$ = this.content.asObservable();

  id = "i9f1iwc96kh09vk";
  dataFile = "data.json";

  token = environment.dropboxToken;
  constructor(private http: HttpClient) {
    this.getFromDropBox().subscribe(
      data => {
        this.content.next(data);
      },
      err => {
        console.log("error", err);
      }
    );
  }

  getContent() {
    return this.content$;
  }

  getFromDropBox() {
    return this.http
      .post<any>("/dropbox/files/download", null, this.headers())
      .pipe();
  }

  headers() {
    return {
      headers: {
        Authorization: "Bearer " + this.token,
        "Dropbox-API-Arg": `{"path":"/${this.dataFile}"}`
      }
    };
  }

  getLocalFile(fileName: string = this.dataFile) {
    const url = `/assets/${fileName}`;

    return this.http
      .get<any>(url, {
        headers: {}
      })
      .pipe();
  }

  getFile(fileName: string = this.dataFile): Observable<any> {
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
