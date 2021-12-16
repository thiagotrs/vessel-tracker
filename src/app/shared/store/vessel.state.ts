import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { Port } from "src/app/core/models/port.model";
import { Vessel } from "src/app/core/models/vessel.model";

export interface IVessel {
    vessels: Vessel[],
    error: string | null
}

export const vesselInitialState: IVessel = {
    vessels: [],
    error: null
}

export const loadVessels = createAction('[Vessel] Load Vessels')
export const addVessel = createAction('[Vessel] Add Vessel', props<{ vessel: Vessel, portId: string }>())
export const dockVessel = createAction('[Vessel] Dock Vessel', props<{ id: string }>())
export const undockVessel = createAction('[Vessel] Undock Vessel', props<{ id: string }>())
export const editNextRoutes= createAction('[Vessel] Edit Next Routes', props<{ vesselId: string, nextStops: Port[] }>())

export const loadVesselsSuccess = createAction('[Vessel API] Load Vessels Success', props<{ vessels: Vessel[] }>())
export const addVesselSuccess = createAction('[Vessel API] Add Vessel Success', props<{ vessel: Vessel }>())
export const dockVesselSuccess = createAction('[Vessel API] Dock Vessel Success', props<{ vessel: Vessel }>())
export const undockVesselSuccess = createAction('[Vessel API] Undock Vessel Success', props<{ vessel: Vessel }>())
export const editNextRoutesSuccess = createAction('[Vessel API] Edit Next Routes Success', props<{ vessel: Vessel }>())

export const loadVesselsFailure = createAction('[Vessel API] Load Vessels Failure', props<{ error: string }>())
export const addVesselFailure = createAction('[Vessel API] Add Vessel Failure', props<{ error: string }>())
export const dockVesselFailure = createAction('[Vessel API] Dock Vessel Failure', props<{ error: string }>())
export const undockVesselFailure = createAction('[Vessel API] Undock Vessel Failure', props<{ error: string }>())
export const editNextRoutesFailure = createAction('[Vessel API] Edit Next Routes Failure', props<{ error: string }>())

export const vesselReducer = createReducer(
    vesselInitialState,
    on(loadVesselsSuccess, (state, { vessels }) => ({ vessels, error: null })),
    on(loadVesselsFailure, (state, { error }) => ({ ...state, error })),
    on(addVesselSuccess, (state, { vessel }) => ({ vessels: [...state.vessels, vessel], error: null })),
    on(addVesselFailure, (state, { error }) => ({ ...state, error })),
    on(dockVesselSuccess, (state, { vessel }) => {
        const newVessels = state.vessels.map(v => (vessel.id === v.id) ? ({ ...vessel }) : v)
        return { vessels: [...newVessels], error: null }
    }),
    on(dockVesselFailure, (state, { error }) => ({ ...state, error })),
    on(undockVesselSuccess, (state, { vessel }) => {
        const newVessels = state.vessels.map(v => (vessel.id === v.id) ? ({ ...vessel }) : v)
        return { vessels: [...newVessels], error: null }
    }),
    on(undockVesselFailure, (state, { error }) => ({ ...state, error })),
    on(editNextRoutesSuccess, (state, { vessel }) => {
        const newVessels = state.vessels.map(v => (vessel.id === v.id) ? ({ ...vessel }) : v)
        return { vessels: [...newVessels], error: null }
    }),
    on(editNextRoutesFailure, (state, { error }) => ({ ...state, error })),
)

export const selectVesselState = createFeatureSelector<IVessel>('vessel')
export const selectVessels = createSelector(selectVesselState, (vessel: IVessel) => vessel.vessels)
export const selectVesselError = createSelector(selectVesselState, (vessel: IVessel) => vessel.error)
export const selectVesselById = (id: string) => createSelector(selectVesselState, 
    (vessel: IVessel) => vessel.vessels.find(vessel => vessel.id === id)
)