import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { SvgSubscriptionService } from 'src/app/service/svg-subscription.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public auth: AuthService,
              public dialogRef: MatDialogRef<LoginComponent>,
              private svgService: SvgSubscriptionService,)
  {

  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
