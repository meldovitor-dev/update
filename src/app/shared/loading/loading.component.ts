import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tecvirt-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() label = '';
  @Input() color = 'primary';
  @Input() small = false;
  @Input() layout = '';
  constructor() { }

  ngOnInit() { }
}
