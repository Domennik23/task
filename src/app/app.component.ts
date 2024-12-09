import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {InfoComponent} from "./components/info/info.component";
import {LoaderComponent} from "./components/loader/loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InfoComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
