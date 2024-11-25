import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sobre',
  standalone: true,
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss'],
  imports: [CommonModule],
})
export class SobreComponent {
  images: string[] = [
    '/assets/imgs/snow_stepmom.jpg',
    '/assets/imgs/book_grim.jpg',
    '/assets/imgs/goldilocks.jpg',
    '/assets/imgs/maleficent.jpg',
    '/assets/imgs/oliver_twist.jpg',
    '/assets/imgs/house_grim.jpg',
  ];
  currentSlide = 0;

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }
}