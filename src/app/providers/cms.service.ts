import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
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

  constructor(private http: HttpClient) {
    this.getManifest().subscribe(
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

  getManifest() {
    return this.http.get<any>('https://scottb.app/manifest/files/download')
  }
}
