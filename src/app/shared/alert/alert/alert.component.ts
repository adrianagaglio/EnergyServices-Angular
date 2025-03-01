import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() message!: string;

  @Input() type!: string;

  @Output() closeAlert = new EventEmitter<boolean>();

  close() {
    this.closeAlert.emit(true);
  }
}
