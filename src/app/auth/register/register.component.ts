import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';
import {UseService} from '../../service/use/use.service';
import {JsService} from '../../service/js.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    // password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]),
    // confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]),
  });

  constructor(private userService: UseService,
              private router: Router,
              private  js: JsService,
              private notificationService: NotificationService) {
  }
  ngOnInit() {
    this.js.jsActive()
  }
  get email() {
    return this.registerForm.get('email');
  }
  get username() {
    return this.registerForm.get('username');
  }

  get phone() {
    return this.registerForm.get('phone');
  }
  get address() {
    return this.registerForm.get('address');
  }

  register() {
    if (this.registerForm.valid) {
      const user = {
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        phone: this.registerForm.value.phone,
        address: this.registerForm.value.address,
        password: this.registerForm.value.phone,
        confirmPassword: this.registerForm.value.phone
      };
      this.userService.register(user).subscribe(() => {
        this.registerForm.reset();
        this.notificationService.showTopRightMessage('success', 'Đăng ký thành công');
        this.router.navigateByUrl('auth/login');
      }, error => {
        console.log(error);
        this.notificationService.showMessage('error', error.error.message);
      });
    }
  }
}
