import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Port } from 'src/app/core/models/port.model';
import { Status, Vessel } from 'src/app/core/models/vessel.model';
import { ConfirmModalComponent } from 'src/app/shared/components/modal/confirm-modal.component';
import { PortService } from 'src/app/shared/services/port.service';
import { PortalService } from 'src/app/shared/services/portal.service';
import { VesselService } from 'src/app/shared/services/vessel.service';

@Component({
  selector: 'app-vessel-add',
  templateUrl: './vessel-add.component.html',
  styles: []
})
export class VesselAddComponent implements OnInit, OnDestroy {

  status:Status[] = [Status.SAILING, Status.PARKED]

  ports!:Port[]

  private portsSub!: Subscription

  constructor(
    private vesselService: VesselService,
    private portService: PortService,
    private router: Router,
    private portalService: PortalService
  ) { }

  ngOnInit(): void {
    this.portsSub = this.portService.getPorts().subscribe(ports => {this.ports = ports})
  }

  onSubmit(myForm:NgForm) {
    this.openModal(() => {
      const vessel = { name: myForm.form.value.name, ownership: myForm.form.value.ownership, year: myForm.form.value.year }  as Vessel
      const port = this.ports.find(port => port.id === myForm.form.value.port) as Port
      this.vesselService.createVessel(vessel, port).subscribe({
        complete: () => this.router.navigate(['/vessel'])
      })
    });
  }

  clear(myForm:NgForm) {
    myForm.resetForm({port:''})
  }

  openModal(saveFn: Function) {
    const componentRef = this.portalService.open(ConfirmModalComponent)
    componentRef.title = 'Confirmation!';
    componentRef.message = "Are you sure of add new vessel?";
    componentRef.onDeny.subscribe(() => {
      this.portalService.close();
    })
    componentRef.onConfirm.subscribe(() => {
      saveFn();
      this.portalService.close();
    })

    // const alertModalFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent)
    // this.alertModal.clear()
    // const alertModalRef = this.alertModal.createComponent(alertModalFactory)
    // alertModalRef.instance.title = 'teste';
    // alertModalRef.instance.message = "isso é um teste"
    // alertModalRef.instance.onClose.subscribe(() => {console.log('close button was clicked')})
    // alertModalRef.instance.onSave.subscribe(() => {console.log('save button was clicked')})
  }

  ngOnDestroy():void {
    this.portsSub.unsubscribe()
  }

}
