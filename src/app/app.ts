import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Footer } from './components/footer/footer';
import { ProductList } from "./components/products/product-list/product-list";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Hero, Footer, ProductList], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lojaMinsait');
}