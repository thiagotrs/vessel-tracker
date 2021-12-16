import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
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
export class VesselAddComponent implements OnInit {

  status: Status[] = [Status.SAILING, Status.PARKED]

  ports$: Observable<Port[]>

  constructor(
    private vesselService: VesselService,
    private portService: PortService,
    private portalService: PortalService
  ) {
    this.ports$ = this.portService.ports$
  }

  ngOnInit(): void {
  }

  onSubmit(myForm:NgForm) {
    this.openModal(() => {
      const vessel = { name: myForm.form.value.name, ownership: myForm.form.value.ownership, year: myForm.form.value.year } as Vessel
      this.vesselService.createVessel(vessel, myForm.form.value.port)
    });
  }

  clear(myForm:NgForm) {
    myForm.resetForm({ port:'' })
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

}
