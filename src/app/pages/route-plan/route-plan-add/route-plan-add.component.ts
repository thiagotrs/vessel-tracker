import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Port } from 'src/app/core/models/port.model';
import { Stop, Vessel } from 'src/app/core/models/vessel.model';
import { PortalService } from 'src/app/shared/services/portal.service';
import { CanComponentDeactivate } from 'src/app/shared/services/auth.guard';
import { PortService } from 'src/app/shared/services/port.service';
import { VesselService } from 'src/app/shared/services/vessel.service';
import { ConfirmModalComponent } from 'src/app/shared/components/modal/confirm-modal.component';

@Component({
  selector: 'app-route-plan-add',
  templateUrl: './route-plan-add.component.html',
  styles: []
})
export class RoutePlanAddComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  private id:string

  vessel!: Vessel
  ports!: Port[]
  nextStops: Port[] = []
  currentStop!: Stop | null

  private vesselSub!: Subscription
  private portsSub!: Subscription

  isUnsaved: boolean = false
  errMessage: string = ''

  private _modalConfirmation: Subject<boolean> = new Subject<boolean>()

  constructor(
    private vesselService: VesselService,
    private portService: PortService,
    private portalService: PortalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if(!this.isUnsaved) {
      return true
    }
    this.openModal()
    return this._modalConfirmation.asObservable()
  }

  ngOnInit(): void {
    this.vesselSub = this.vesselService.getVessel(this.id).subscribe(vessel => {
      if(vessel === undefined) {
        this.router.navigate(['/not-found'])
      }
      
      this.vessel = vessel as Vessel
      this.nextStops = (this.vessel?.nextStops.filter(stop => !(stop.dateIn || stop.dateOut))
                                              .map(stop => stop.port)) || []
      this.currentStop = (this.vessel?.nextStops.find(stop => (stop.dateIn || stop.dateOut))) || null
    });

    this.portsSub = this.portService.ports$.subscribe(ports => {this.ports = ports})
  }

  save() {
    this.vesselService.editNextRoutes(this.id, this.nextStops)
    this.isUnsaved = false;
  }

  removeStop(index: number) {
    this.nextStops = this.nextStops.filter((_, idx) => idx !== index)
    this.isUnsaved = true;
  }

  addStop(id: string) {
    const port = this.ports.find(port => port.id === id)
    if (
      port // if port exists
      && (this.nextStops[this.nextStops.length - 1]?.id !== id) // if equal to last next stop
      && (this.currentStop?.port.id !== id) // if equal to current stop
    ) {
      this.nextStops = [...this.nextStops, port]
      this.isUnsaved = true;
    } else {
      this.errMessage = 'Cannot add same port as last neither than current'
    }
  }

  closeAlert() {
    this.errMessage = ''
  }

  openModal() {
    const componentRef = this.portalService.open(ConfirmModalComponent)
    componentRef.title = 'Discard changes?';
    componentRef.message = "There are changes unsaved.";
    componentRef.denyTitle = "No"
    componentRef.confirmTitle = "Yes"
    componentRef.onDeny.subscribe(() => {
      this._modalConfirmation.next(false);
      this.portalService.close();
    })
    componentRef.onConfirm.subscribe(() => {
      this._modalConfirmation.next(true);
      this.portalService.close();
    })
  }

  ngOnDestroy():void {
    this.vesselSub.unsubscribe()
    this.portsSub.unsubscribe()
  }

}
