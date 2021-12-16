import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { Port } from "src/app/core/models/port.model";

export interface IPort {
    ports: Port[],
    error: string | null
}

export const portInitialState: IPort = {
    ports: [],
    error: null
}

export const loadPorts = createAction('[Port] Load Ports')
export const addPort = createAction('[Port] Add Port', props<{ port: Port }>())

export const loadPortsSuccess = createAction('[Port] Load Ports Success',  props<{ ports: Port[] }>())
export const addPortSuccess = createAction('[Port] Add Port Success', props<{ port: Port }>())

export const loadPortsFailure = createAction('[Port API] Load Ports Failure', props<{ error: string }>())
export const addPortFailure = createAction('[Port API] Add Port Failure', props<{ error: string }>())

export const portReducer = createReducer(
    portInitialState,
    on(loadPortsSuccess, (state, { ports }) => ({ ports, error: null })),
    on(loadPortsFailure, (state, { error }) => ({ ...state, error })),
    on(addPortSuccess, (state, { port }) => ({ ports: [...state.ports, port], error: null })),
    on(addPortFailure, (state, { error }) => ({ ...state, error })),
)

export const selectPortState = createFeatureSelector<IPort>('port')
export const selectPorts = createSelector(selectPortState, (ports: IPort) => ports.ports)
export const selectPortsError = createSelector(selectPortState, (ports: IPort) => ports.error)
export const selectPortById = (id: string) => createSelector(selectPortState, 
    (port: IPort) => port.ports.find(port => port.id === id)
)