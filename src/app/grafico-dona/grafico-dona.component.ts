import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() doughnutChartData: number[];
  @Input() doughnutChartLabels: string[];
  @Input() doughnutChartType: string;

  constructor() { }

  ngOnInit() {
  }

}
