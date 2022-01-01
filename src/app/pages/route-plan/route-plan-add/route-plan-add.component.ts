import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Port } from 'src/app/core/models/port.model';
import { Stop, Vessel } from 'src/app/core/models/vessel.model';
import { PortalService } from 'src/app/shared/services/portal.service';
import { CanComponentDeactivate } from 'src/app/shared/services/auth.guard';
import { PortService } from 'src/app/shared/services/port.service';
import { VesselService } from 'src/app/shared/services/vessel.service';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-route-plan-add',
  templateUrl: './route-plan-add.component.html',
  styles: []
})
export class RoutePlanAddComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
  private id: string;

  vessel!: Vessel;
  ports!: Port[];
  nextStops: Port[] = [];
  currentStop!: Stop | null;
  isUnsaved!: boolean;
  alertMessage!: string | null;

  isLoading$: Observable<boolean>;

  private subs = new Subscription();

  private _modalConfirmation: Subject<boolean> = new Subject<boolean>();

  formatLocation(port: Port) {
    return `${port.name} (${port.location.city}, ${port.location.country})`;
  }

  constructor(
    private vesselService: VesselService,
    private portService: PortService,
    private portalService: PortalService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.isLoading$ = this.vesselService.isLoading$;
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (!this.isUnsaved) {
      return true;
    }
    this.openModal();
    return this._modalConfirmation.asObservable();
  }

  ngOnInit(): void {
    this.vesselService.loadVesselById(this.id);
    this.portService.loadPorts();
    this.subs.add(
      this.vesselService.selectedVessel$.subscribe((vessel) => {
        this.vessel = vessel as Vessel;
        this.nextStops =
          this.vessel?.nextStops
            .filter((stop) => !(stop.dateIn || stop.dateOut))
            .map((stop) => stop.port) || [];
        this.currentStop =
          this.vessel?.nextStops.find((stop) => stop.dateIn || stop.dateOut) ||
          null;
      })
    );

    this.subs.add(
      this.portService.ports$.subscribe((ports) => {
        this.ports = ports;
      })
    );
  }

  save() {
    this.vesselService.editNextRoutes(this.id, this.nextStops);
    this.isUnsaved = false;
  }

  removeStop(index: number) {
    this.nextStops = this.nextStops.filter((_, idx) => idx !== index);
    this.isUnsaved = true;
  }

  // check if port exists,
  // if equal to last stop added and
  // if equal to current stop and is the first next stop
  addStop(id: string) {
    const port = this.ports.find((port) => port.id === id);
    if (
      port &&
      this.nextStops[this.nextStops.length - 1]?.id !== id &&
      (this.nextStops.length > 0 || this.currentStop?.port.id !== id)
    ) {
      this.nextStops = [...this.nextStops, port];
      this.isUnsaved = true;
    } else {
      this.alertMessage = 'Cannot add same port as last neither than current';
    }
  }

  closeAlert() {
    this.alertMessage = '';
  }

  openModal() {
    const componentRef = this.portalService.open(ConfirmModalComponent);
    componentRef.title = 'Discard changes?';
    componentRef.message = 'There are changes unsaved.';
    componentRef.denyTitle = 'No';
    componentRef.confirmTitle = 'Yes';
    componentRef.deny.subscribe(() => {
      this._modalConfirmation.next(false);
      this.portalService.close();
    });
    componentRef.confirm.subscribe(() => {
      this._modalConfirmation.next(true);
      this.portalService.close();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
