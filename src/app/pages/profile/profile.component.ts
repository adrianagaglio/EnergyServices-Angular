import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthsrvService } from '../../auth/authsrv.service';
import { iAppUserResponse } from '../../auth/interfaces/i-appUserResponse';
import { InvoiceService } from '../../services/invoice.service';
import { UploadSvcService } from '../../services/upload-svc.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  form!: FormGroup;
  passForm!: FormGroup;

  customer!: iAppUserResponse;
  isEditing: boolean = false;
  isEditingPassword: boolean = false;

  @ViewChild('imgInput') imgInput!: ElementRef;
  previewUrl: string | null = null;
  file: File | undefined = undefined;

  message: string = '';

  constructor(
    private authSrv: AuthsrvService,
    private router: Router,
    private fb: FormBuilder,
    private invoiceSvc: InvoiceService,
    private uploadSvc: UploadSvcService
  ) {
    if (this.authSrv.userAuthSubject$.getValue()) {
      authSrv.getByCustomerWithAppUser().subscribe((data) => {
        this.customer = data;
        this.form = this.fb.group({
          id: [this.customer.id, [Validators.required]],
          name: [this.customer.name, [Validators.required]],
          surname: [this.customer.surname, [Validators.required]],
          email: [this.customer.email, [Validators.required, Validators.email]],
          avatar: [
            this.customer.avatar
              ? this.customer.avatar
              : 'https://ui-avatars.com/api/?name=A+A',
            [Validators.required],
          ],
          username: [this.customer.username, [Validators.required]],
        });
      });
    } else {
      this.router.navigate(['auth']);
    }
  }

  ngOnInit(): void {}

  save() {
    if (this.file) {
      this.uploadSvc.uploadImage(this.file).subscribe((data) => {
        this.form.patchValue({
          avatar: data.url,
        });
        this.sendData();
      });
    } else {
      this.sendData();
    }
  }

  sendData() {
    this.authSrv.updateAppUser(this.form.value).subscribe((data) => {
      console.log(data);
      this.isEditing = false;
      this.message = 'Profile info updated';
    });
  }

  enableEditing() {
    if (this.isEditing) {
      this.previewUrl = null;
    }
    if (this.isEditingPassword) {
      this.enableEditingPassword();
    } else {
      this.isEditing = !this.isEditing;
    }
  }

  enableEditingPassword() {
    this.isEditingPassword = !this.isEditingPassword;
    if (this.isEditingPassword) {
      this.passForm = this.fb.group({
        oldPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
      });
    }
  }

  getTotalByCustomer(year: number) {
    this.invoiceSvc.getTotalByCustomer(year).subscribe();
  }
  triggerInput() {
    if (this.isEditing && this.imgInput) {
      this.imgInput.nativeElement.click();
    }
  }
  onFileSelected(event: Event): void {
    this.file = (event.target as HTMLInputElement).files?.[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  savePassword() {
    this.authSrv.changePassword(this.passForm.value).subscribe((data) => {
      console.log(data);
      this.isEditingPassword = false;
      this.isEditing = false;
    });
  }

  clearMessage() {
    this.message = '';
  }
}
