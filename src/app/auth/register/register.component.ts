import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CitysrvService } from '../../services/citysrv.service';
import { iDistrictResponse } from '../../interfaces/idistrictresponse';
import { iCityResponse } from '../../interfaces/icityresponse';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
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
    private authSrv: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private cityService: CitysrvService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.cityService.getAllDistricts().subscribe({
      next: (districts) => {
        this.districts = districts;
      },
      error: (error) => {
        console.error('Errore nel caricamento dei distretti:', error);
      },
    });
  }

  private initForm() {
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
          district: ['', Validators.required],
          districtCode: [''],
          city: ['', Validators.required],
          isCheck: [false],
        }),
        operationalHeadquartersAddress: this.fb.group({
          street: ['', [Validators.required]],
          addressNumber: ['', [Validators.required]],
          cap: [
            null,
            [Validators.required, Validators.min(10000), Validators.max(99999)],
          ],
          district: ['', Validators.required],
          districtCode: [''],
          city: ['', Validators.required],
        }),
      }),
      avatar: [''],
    });
  }

  invalidAccountData() {
    return (
      this.form.get('name')?.invalid ||
      this.form.get('surname')?.invalid ||
      this.form.get('email')?.invalid ||
      this.form.get('password')?.invalid ||
      this.form.get('username')?.invalid
    );
  }

  invalidCustomerData() {
    return (
      this.form.get('customer.denomination')?.invalid ||
      this.form.get('customer.vatCode')?.invalid ||
      this.form.get('customer.pec')?.invalid ||
      this.form.get('customer.phone')?.invalid ||
      this.form.get('customer.contactPhone')?.invalid ||
      this.form.get('customer.type')?.invalid
    );
  }

  invalidAddressData(type: string) {
    return (
      this.form.get('customer.' + type + '.street')?.invalid ||
      this.form.get('customer.' + type + '.addressNumber')?.invalid ||
      this.form.get('customer.' + type + '.cap')?.invalid ||
      this.form.get('customer.' + type + '.district')?.invalid ||
      this.form.get('customer.' + type + '.city')?.invalid
    );
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

  setCode(code: string) {
    console.log(code);
  }

  onDistrictChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    const code = this.districts.find((d) => d.name === selectedValue)?.code;

    this.form
      .get('customer.registeredOfficeAddress.districtCode')!
      .setValue(code);

    if (selectedValue) {
      this.cityService.getCitiesByDistrict(selectedValue).subscribe({
        next: (cities) => {
          this.cities = cities;
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

    const code = this.districts.find((d) => d.name === selectedValue)?.code;

    this.form
      .get('customer.operationalHeadquartersAddress.districtCode')!
      .setValue(code);

    if (selectedValue) {
      this.cityService.getCitiesByDistrict(selectedValue).subscribe({
        next: (cities) => {
          this.cities = cities;
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
    this.isCheck = this.form.get(
      'customer.registeredOfficeAddress.isCheck'
    )?.value;
    if (this.isCheck) {
      const legalAddress = this.form.get(
        'customer.registeredOfficeAddress'
      )?.value;
      const operationalAddress = this.form.get(
        'customer.operationalHeadquartersAddress'
      );
      operationalAddress?.patchValue(legalAddress);
      this.selected1 = true;
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
