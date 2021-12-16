import { ActionReducerMap } from "@ngrx/store"
import { authReducer, IAuth } from "./auth.state"
import { IPort, portReducer } from "./port.state"
import { IVessel, vesselReducer } from "./vessel.state"

export interface IAppState {
    auth: IAuth,
    port: IPort,
    vessel: IVessel
}

export const appReducer: ActionReducerMap<IAppState> = {
    auth: authReducer,
    port: portReducer,
    vessel: vesselReducer
}