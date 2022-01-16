import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SvgSubscriptionService {

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,) 
  { 
    this.matIconRegistry.addSvgIcon(
      `google-icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/google-icon.svg")
    );
  }
}
