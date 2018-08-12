import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

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
  constructor(private http: HttpClient) {
    this.getLocalFile().subscribe(data => {
      this.content.next(data);
    });
  }

  getContent() {
    return this.content$;
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
