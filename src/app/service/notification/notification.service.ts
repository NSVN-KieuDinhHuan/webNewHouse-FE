/* tslint:disable */
import {Injectable} from '@angular/core';

declare var $: any;
declare var Swal: any;
declare var toastr: any;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
  }

  showMessage(icon, title) {
    $(function() {
      Swal.fire({
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 3000
      });
    });

  }

  showErrorMessage(title){
    this.showMessage('error', title);
  }

  showSuccessMessage(tittle){
    this.showMessage('success', tittle);
  }

  showTopRightMessage(icon, title) {
    $( document ).ready(function() {
      var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 10000
      });

      Toast.fire({
        icon: icon,
        title: title
      })
    });
  }

}
