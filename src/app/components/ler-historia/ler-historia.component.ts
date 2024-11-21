import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { historia } from '../../entities/historia';
import { HistoriaService } from '../../services/historia.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ler-historia',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardSubtitle, MatCardTitle, MatCardHeader],
  templateUrl: './ler-historia.component.html',
  styleUrl: './ler-historia.component.scss'
})
export class LerHistoriaComponent implements OnInit {
  historiaLer: historia | null = null;  // To store the individual Historia
  constructor(
    private service: HistoriaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the ID from the URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.findAll(+id);  // Convert ID to a number and fetch the Historia
    }
  }

  findAll(id: number): void {
    this.service.findById(id).subscribe({
      next: (data) => {
        this.historiaLer = data;  // Set the fetched Historia data
        console.log('Historia fetched:', data); // Optional: Log the data
      },
      error: (err) => {
        console.error('Error fetching Historia:', err);  // Handle error
      }
    });
  }
}
