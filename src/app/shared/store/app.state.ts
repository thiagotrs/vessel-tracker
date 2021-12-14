import { ActionReducerMap } from "@ngrx/store"
import { authReducer, IAuth } from "./auth.state"

export interface IAppState {
    auth: IAuth
}

export const appReducer: ActionReducerMap<IAppState> = {
    auth: authReducer
}