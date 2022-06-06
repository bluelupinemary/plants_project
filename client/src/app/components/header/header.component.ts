import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() optionChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onStateChange(): void{
    this.optionChange.emit();
    console.log('change state here')
  }

}
