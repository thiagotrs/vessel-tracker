import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Port } from 'src/app/core/models/port.model';
import { User } from 'src/app/core/models/user.model';
import { Vessel } from 'src/app/core/models/vessel.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PortService } from 'src/app/shared/services/port.service';
import { VesselService } from 'src/app/shared/services/vessel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  user$: Observable<User | null>;
  isAuth$: Observable<boolean>;
  trackedVessels$: Observable<Vessel[]>;
  trackedPorts$: Observable<Port[]>;

  constructor(
    private authService: AuthService,
    private vesselService: VesselService,
    private portService: PortService
  ) {
    this.isAuth$ = this.authService.isAuth$;
    this.user$ = this.authService.user$;
    this.trackedVessels$ = this.vesselService.vessels$;
    this.trackedPorts$ = this.portService.ports$;
  }

  ngOnInit(): void {
    this.portService.loadPorts();
    this.vesselService.loadVessels();
  }
}
