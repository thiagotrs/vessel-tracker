import { ActionReducerMap } from "@ngrx/store"
import { authReducer, IAuth } from "./auth.state"
import { IPort, portReducer } from "./port.state"

export interface IAppState {
    auth: IAuth,
    port: IPort
}

export const appReducer: ActionReducerMap<IAppState> = {
    auth: authReducer,
    port: portReducer
}