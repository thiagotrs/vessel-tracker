import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Port } from 'src/app/core/models/port.model';
import { Stop, Vessel } from 'src/app/core/models/vessel.model';
import { PortalService } from 'src/app/shared/services/portal.service';
import { CanComponentDeactivate } from 'src/app/shared/services/auth.guard';
import { PortService } from 'src/app/shared/services/port.service';
import { ConfirmModalComponent } from 'src/app/shared/components/modal/confirm-modal.component';
import { RoutePlanService } from '../services/route-plan.service';

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
  isLoading!: boolean
  isUnsaved!: boolean
  alertMessage!: string | null

  private _modalConfirmation: Subject<boolean> = new Subject<boolean>()

  private vesselSub!: Subscription
  private portsSub!: Subscription
  private nextStopsSub!: Subscription
  private currentStopSub!: Subscription
  private isUnsavedSub!: Subscription
  
  isLoading$: Observable<boolean>;
  alertMessage$: Observable<string | null>;

  constructor(
    private routePlanService: RoutePlanService,
    private portService: PortService,
    private portalService: PortalService,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.isLoading$ = this.routePlanService.isLoading$
    this.alertMessage$ = this.routePlanService.alertMessage$
  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if(!this.isUnsaved) {
      return true
    }
    this.openModal()
    return this._modalConfirmation.asObservable()
  }

  ngOnInit(): void {
    this.routePlanService.loadVesselById(this.id)
    this.portService.loadPorts()
    this.portsSub = this.portService.ports$.subscribe(ports => this.ports = ports)
    this.vesselSub = this.routePlanService.selectedVessel$.subscribe(vessel => this.vessel = vessel as Vessel)
    this.currentStopSub = this.routePlanService.currentStop$.subscribe(stop => this.currentStop = stop)
    this.nextStopsSub = this.routePlanService.nextStops$.subscribe(stops => this.nextStops = stops)
    this.isUnsavedSub = this.routePlanService.isUnsaved$.subscribe(flag => this.isUnsaved = flag)
  }

  save() {
    this.routePlanService.saveRoutes(this.id, this.nextStops)
  }

  removeStop(index: number) {
    this.routePlanService.removeStop(index)
  }

  addStop(id: string) {
    const port = this.ports.find(port => port.id === id)
    if (
      port // if port exists
      && (this.nextStops[this.nextStops.length - 1]?.id !== id) // if equal to last next stop
      && (this.currentStop?.port.id !== id) // if equal to current stop
    ) {
      this.routePlanService.addStop(port)
    } else {
      this.routePlanService.setAlertMessage('Cannot add same port as last neither than current')
    }
  }

  closeAlert() {
    this.routePlanService.cleanAlertMessage()
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
    this.nextStopsSub.unsubscribe()
    this.currentStopSub.unsubscribe()
    this.isUnsavedSub.unsubscribe()
  }

}
