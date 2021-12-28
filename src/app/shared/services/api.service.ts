import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { concatMap, map, tap } from "rxjs/operators";
import { Port } from "src/app/core/models/port.model";
import { User } from "src/app/core/models/user.model";
import { Status, Stop, Vessel } from "src/app/core/models/vessel.model";
import { environment } from "src/environments/environment";

interface PortHttp {
  id?: string,
  name: string,
  capacity: number,
  city: string,
  country: string,
  lat?: number,
  long?: number
}

interface StopHttp {
  ports?: PortHttp,
  dateIn?:Date,
  dateOut?:Date,
  portId?: string,
  vesselId?: string,
  id?: number
}

interface VesselHttp {
  id?: string,
  name: string,
  ownership: string,
  status: Status,
  year: number,
  stops?: StopHttp[],
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = environment.apiURL

  constructor(private httpClient: HttpClient) { }

  private toVessel(vesselHttp: VesselHttp): Vessel {
    return {
      id: vesselHttp.id!,
      name: vesselHttp.name,
      ownership: vesselHttp.ownership,
      status: vesselHttp.status,
      year: vesselHttp.year,
      stops: vesselHttp.stops?.filter(stop => stop.dateIn && stop.dateOut).map(s => this.toStop(s)) || [],
      nextStops: vesselHttp.stops?.filter(stop => !stop.dateOut).map(s => this.toStop(s)) || []
    }
  }

  private toVesselHttp(vessel: Vessel): VesselHttp {
    return {
      id: vessel.id,
      name: vessel.name,
      ownership: vessel.ownership,
      status: vessel.status,
      year: vessel.year
    }
  }

  private toStop(stopHttp: StopHttp): Stop {
    return {
      port: this.toPort(stopHttp.ports!),
      dateIn: stopHttp.dateIn,
      dateOut: stopHttp.dateOut,
      id: stopHttp.id
    }
  }

  private toStopHttp(stop: Stop, vesselId?: string): StopHttp {
    return {
      dateIn: stop.dateIn,
      dateOut: stop.dateOut,
      portId: stop.port.id,
      vesselId,
      id: stop.id
    }
  }

  private toPort(portHttp: PortHttp): Port {
    return {
      id: portHttp.id!,
      name: portHttp.name,
      capacity: portHttp.capacity,
      location: {
        city: portHttp.city,
        country: portHttp.country,
        point: (portHttp.lat && portHttp.long) ? [portHttp.lat, portHttp.long] : undefined
      }
    }
  }

  private toPortHttp(port: Port): PortHttp {
    return {
      name: port.name,
      capacity: port.capacity,
      city: port.location.city,
      country: port.location.country,
      lat: port.location.point && port.location.point[0],
      long: port.location.point && port.location.point[1]
    }
  }

  getPorts(): Observable<Port[]> {
    return this.httpClient.get<PortHttp[]>(`${this.apiUrl}/rest/v1/ports?select=*`).pipe(
      map(ports => ports.map(port => this.toPort(port)))
    )
  }

  addPort(port: Port): Observable<Port> {
    return this.httpClient.post<PortHttp[]>(`${this.apiUrl}/rest/v1/ports`, this.toPortHttp(port)).pipe(
      map(ports => this.toPort(ports[0]))
    )
  }

  getPort(id: string): Observable<Port> {
    return this.httpClient.get<PortHttp[]>(`${this.apiUrl}/rest/v1/ports?id=eq.${id}`).pipe(
      map(ports => this.toPort(ports[0]))
    )
  }

  getVessels(): Observable<Vessel[]> {
    return this.httpClient.get<VesselHttp[]>(`${this.apiUrl}/rest/v1/vessels?select=*,stops(*, ports(*))`).pipe(
      map(vessels => vessels.map(vessel => this.toVessel(vessel)))
    )
  }

  getVessel(id: string): Observable<Vessel> {
    return this.httpClient.get<VesselHttp[]>(
      `${this.apiUrl}/rest/v1/vessels?id=eq.${id}&select=*,stops(*, ports(*))`
    ).pipe(
      map(vessels => this.toVessel(vessels[0]))
    )
  }

  addVessel(vessel: Vessel, portId: string): Observable<Vessel> {
    return this.httpClient.post<VesselHttp[]>(
      `${this.apiUrl}/rest/v1/vessels`,
      this.toVesselHttp(vessel)
    ).pipe(
      concatMap(vessels => this.httpClient.post<StopHttp[]>(
        `${this.apiUrl}/rest/v1/stops?select=*,ports(*)`,
        { portId, vesselId: vessels[0].id, dateIn: new Date().toISOString() }
      ).pipe(
        map(stops => this.toVessel({ ...vessels[0], stops: [stops[0]] })))
      ),
    )
  }

  updateVessel(stop: Stop, vesselId: string): Observable<Stop> {
    const stopHttp = this.toStopHttp(stop, vesselId)
    return this.httpClient.patch<StopHttp[]>(
      `${this.apiUrl}/rest/v1/stops?id=eq.${stop.id}&select=*,ports(*)`,
      stopHttp
    ).pipe(
      map(stops => this.toStop(stops[0]))
    )
  }

  updateAllStopsVessel(stops: Stop[], vesselId: string): Observable<Stop[]> {
    const stopsHttp = stops.map(stop => this.toStopHttp(stop, vesselId))
    return this.httpClient.delete(
      `${this.apiUrl}/rest/v1/stops?vesselId=eq.${vesselId}&dateIn=is.null&dateOut=is.null`
    ).pipe(
      concatMap(() => this.httpClient.post<StopHttp[]>(
        `${this.apiUrl}/rest/v1/stops?select=*,ports(*)`,
        stopsHttp
      ).pipe(
        map(stops => stops.map(stop => this.toStop(stop)))
      ))
    )
  }

  signIn({ email, pass }: { email: string, pass: string }): Observable<User> {
    return this.httpClient.post<{ access_token: string, user: { email: string } }>(`${this.apiUrl}/auth/v1/token?grant_type=password`, { email, password: pass }).pipe(
      map(res => {
        localStorage.setItem("token", res.access_token)
        return res.user as User
      })
    )
  }

  signUp({ name, email, pass }: { name: string, email: string, pass: string }): Observable<User> {
    return this.httpClient.post<{ access_token: string, user: { email: string } }>(`${this.apiUrl}/auth/v1/signup`, { email, password: pass }).pipe(
      map(res => {
        localStorage.setItem("token", res.access_token)
        return res.user as User
      })
    )
  }

  logout() {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/v1/logout`, {}).pipe(
      tap(() => localStorage.setItem("token", ""))
    )
  }

  verifyUser(): Observable<User> {
    return this.httpClient.get<{ email: string }>(`${this.apiUrl}/auth/v1/user`).pipe(
      map(({ email }) => ({ email }) as User)
    )
  }

}
