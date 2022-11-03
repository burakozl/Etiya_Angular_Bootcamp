import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoadingService } from 'src/app/services/loading.service';
import { Service } from 'src/app/models/service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  editName!: string;
  services!: Service[];
  isEdit: boolean = false;
  editID!: number;
  error!: string;
  serviceAddForm!: FormGroup;
  isLoading!: boolean;

  constructor(
    private servicesService: ServicesService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    // this.isPageLoading();
    // this.loading();
    this.createServiceAddForm();
    this.getServices();
  }

  getServices() {
    // Object tipi henüz belli olmayan referans tip diyebiliriz. Referans tiplerin en temel sınıfı diyebiliriz.
    this.servicesService.getServices().subscribe((response) => {
      //Observer design pattern
      this.services = response;
    });
  }

  edit(service: Service) {
    this.isEdit = true;
    this.editID = service.id;
    this.editName = service.name;
  }
  update() {
    const updateService: Service = {
      id: this.editID,
      name: this.editName,
    };

    this.servicesService.update(updateService).subscribe({
      next: (res) => {
        console.log(`Service (${res.id}) updated`);
      },
      error: (err) => {
        console.log(err);
        this.error = err.message;
      },
      complete: () => {
        this.getServices();
        this.isEdit = false;
      },
    });
  }

  delete(id: number) {
    this.servicesService.delete(id).subscribe({
      next: () => {
        confirm('Are you sure??');
        console.log(`Service (${id}) deleted`);
      },
      error: (err) => {
        console.log('Hataaa: ' + err.message);
      },
      complete: () => {
        this.getServices();
      },
    });
  }
  createServiceAddForm() {
    this.serviceAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.serviceAddForm.invalid) {
      this.error = 'Form is invalid';
      return;
    } else {
      this.error = '';
    }
    const addService: Service = {
      ...this.serviceAddForm.value,
    };
    console.log(this.serviceAddForm.value);

    this.servicesService.add(addService).subscribe({
      next: (res) => {
        console.log(`Category (${res.id}) added`);
      },
      error: (err) => {
        console.log(err);
        this.error = err.message;
      },
      complete: () => {
        this.getServices();
        this.serviceAddForm.reset();
      },
    });
  }

  isPageLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading) => {
      console.log(isLoading);
      this.isLoading = isLoading;
    });
  }

  loading() {
    if (this.services) {
      this.loadingService.stopLoading();
    } else {
      this.loadingService.startLoading();
    }
  }
}
