import { Component } from '@angular/core';
import { DecodeTokenService } from '../../services/decode-token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
    constructor(private decodeToken: DecodeTokenService) {}


  ngOnInit(): void {

  }

}
