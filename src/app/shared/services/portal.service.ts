import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  private _componentRef!: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open<T>(componentRef: Type<T>): T {
    this._componentRef = this.componentFactoryResolver
      .resolveComponentFactory(componentRef)
      .create(this.injector);
    this.appRef.attachView(this._componentRef.hostView);
    document.body.appendChild(this._componentRef.location.nativeElement);

    return this._componentRef.instance;
  }

  close() {
    this.appRef.detachView(this._componentRef.hostView);
    this._componentRef.destroy();
  }
}
