import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<span class="spinner"></span>`,
  styles: [`
  .spinner {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    border: 3px solid;
    border-color: #FFF #FFF transparent transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .spinner::after,
  .spinner::before {
    content: '';  
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 3px solid;
    border-color: transparent transparent #FF3D00 #FF3D00;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotationBack 0.5s linear infinite;
    transform-origin: center center;
  }
  .spinner::before {
    width: 32px;
    height: 32px;
    border-color: #FFF #FFF transparent transparent;
    animation: rotation 1.5s linear infinite;
  }
      
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
  @keyframes rotationBack {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
