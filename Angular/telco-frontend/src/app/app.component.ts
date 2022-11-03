import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'telco-frontend12';
  isLoading:boolean = false;

  today:Date = new Date();


  constructor(private loadingService:LoadingService) {}

  ngOnInit(): void {
    this.subscribeToLoading();
  }


  sumOfNumbers(a:number,b:number):number{
    return a + b;
  }

  btnClick(){
    alert("Butona tıklandı...")
  }

  startLoading(){
    this.loadingService.startLoading();
  }
  subscribeToLoading(){
    this.loadingService.isLoadingSubject.subscribe((isLoading) => {
      this.isLoading = isLoading;
    })
  }
  stopLoading(){
    this.loadingService.stopLoading();
  }
}
