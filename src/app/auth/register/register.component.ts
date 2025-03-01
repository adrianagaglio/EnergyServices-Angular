import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthsrvService } from '../authsrv.service';
import { Router } from '@angular/router';
import { CitysrvService } from '../../services/citysrv.service';
import { iDistrictResponse } from '../../interfaces/idistrictresponse';
import { iCityResponse } from '../../interfaces/icityresponse';
import { DecodeTokenService } from '../../services/decode-token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  types = ['PA', 'SAS', 'SPA', 'SRL'];
  districts: iDistrictResponse[] = [];
  cities: iCityResponse[] = [];
  selected: boolean = false;
  selected1: boolean = false;
  currentStep = 1;
  progress: number = 25;
  formvalid = false;
  isCheck = false;
  roles: string[] = [];
  admin = false;

  message!: string;

  constructor(
    private authSrv: AuthsrvService,
    private router: Router,
    private fb: FormBuilder,
    private cityService: CitysrvService,
    private decodeToken: DecodeTokenService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required]],
      customer: this.fb.group({
        denomination: ['', [Validators.required]],
        vatCode: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        pec: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        contactPhone: ['', [Validators.required]],
        type: ['', [Validators.required]],
        registeredOfficeAddress: this.fb.group({
          street: ['', [Validators.required]],
          addressNumber: ['', [Validators.required]],
          cap: [
            null,
            [Validators.required, Validators.min(10000), Validators.max(99999)],
          ],
          districtId: ['', Validators.required],
          idCity: ['', Validators.required],
          isCheck: [false],
        }),
        operationalHeadquartersAddress: this.fb.group({
          street: ['', [Validators.required]],
          addressNumber: ['', [Validators.required]],
          cap: [
            null,
            [Validators.required, Validators.min(10000), Validators.max(99999)],
          ],
          districtId: ['', Validators.required],
          idCity: ['', Validators.required],
        }),
      }),
      avatar: [''],
    });
  }

  ngOnInit(): void {
    this.cityService.getAllDistricts().subscribe({
      next: (data) => {
        this.districts = data;
      },
      error: (error) => {
        console.error('Errore nel caricamento dei distretti:', error);
      },
    });
  }

  register(): void {
    if (this.form.valid) {
      console.log('Dati inviati:', this.form.value);
      this.authSrv.register(this.form.value).subscribe((res) => {
        this.message = 'User successfully registered';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      });
    } else {
      console.error('Form non valido:', this.form.errors);
    }
  }

  onDistrictChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      console.log(selectedValue);
      this.cityService.getCitiesByDistrictId(+selectedValue).subscribe({
        next: (data) => {
          this.cities = data;
          this.selected = true;
        },
        error: (error) => {
          console.error('Errore nel caricamento delle città:', error);
        },
      });
    } else {
      this.cities = [];
    }
  }

  onDistrictChange1(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      console.log(selectedValue);
      this.cityService.getCitiesByDistrictId(Number(selectedValue)).subscribe({
        next: (data) => {
          this.cities = data;
          this.selected1 = true;
        },
        error: (error) => {
          console.error('Errore nel caricamento delle città:', error);
        },
      });
    } else {
      this.cities = [];
    }
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
      this.progress += 25;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.progress -= 25;
    }
    if (this.isCheck === true)
      this.form.get('customer.registeredOfficeAddress')?.patchValue({
        isCheck: false,
      });
    this.isCheck = false;
  }

  isValid(fieldName: string) {
    return this.form.get(fieldName)?.valid;
  }

  isTouched(fieldName: string) {
    return this.form.get(fieldName)?.touched;
  }

  isInValidTouched(fieldName: string) {
    return !this.isValid(fieldName) && this.isTouched(fieldName);
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }
  onCheckboxChange(): void {
    const isCheck = this.form.get(
      'customer.registeredOfficeAddress.isCheck'
    )?.value;
    console.log(isCheck);
    this.isCheck = isCheck;
    if (isCheck === false) {
      const legalAddress = this.form.get(
        'customer.registeredOfficeAddress'
      )?.value;
      const operationalAddress = this.form.get(
        'customer.operationalHeadquartersAddress'
      );
      operationalAddress?.patchValue(legalAddress);
    } else {
      const operationalAddress = this.form.get(
        'customer.operationalHeadquartersAddress'
      );
      operationalAddress?.reset();
    }
  }

  clearMessage() {
    this.message = '';
  }
}
