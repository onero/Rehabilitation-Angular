import {Component, OnInit} from '@angular/core';
import {LoginEntity} from '../shared/login.entity';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {ClientService} from '../../shared/services/client.service';

@Component({
  selector: 'rehab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private static THERAPIST_EMAIL = 'therapist@test.dk';
  private static THERAPIST_URL = 'therapist/clients';
  private static CLIENT_URL = 'client/profile';

  user = new LoginEntity('', '');

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
  }

  /**
   * Logging in as a Therapist if the email matches the THERAPIST_EMAIL,
   * Else log in as a Client.
   * @param {string} email
   * @param {string} password
   */
  login(email: string, password: string)  {
    this.authService.login(email, password)
      .then(authUser => {
        if (email === LoginComponent.THERAPIST_EMAIL) {
          environment.clientMode = false;
          this.router.navigateByUrl(LoginComponent.THERAPIST_URL);
        } else {
          environment.clientMode = true;
          console.log(authUser.user.uid)
          this.router.navigateByUrl(LoginComponent.CLIENT_URL);
        }
      })
      .catch(error => {
        this.router.navigateByUrl('**');
      });
  }
}
