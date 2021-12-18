import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { Port } from "src/app/core/models/port.model";
import { Vessel } from "src/app/core/models/vessel.model";

export interface IVessel {
    vessels: Vessel[],
    error: string | null,
    selectedVessel: Vessel | null
    loading: boolean
}

export const vesselInitialState: IVessel = {
    vessels: [],
    error: null,
    selectedVessel: null,
    loading: false
}

export const loadVessels = createAction('[Vessel] Load Vessels')
export const addVessel = createAction('[Vessel] Add Vessel', props<{ vessel: Vessel, portId: string }>())
export const dockVessel = createAction('[Vessel] Dock Vessel', props<{ id: string }>())
export const undockVessel = createAction('[Vessel] Undock Vessel', props<{ id: string }>())
export const editNextRoutes = createAction('[Vessel] Edit Next Routes', props<{ vesselId: string, nextStops: Port[] }>())
export const loadVesselById = createAction('[Vessel] Load Vessel By Id', props<{ vesselId: string }>())

export const loadVesselsSuccess = createAction('[Vessel API] Load Vessels Success', props<{ vessels: Vessel[] }>())
export const addVesselSuccess = createAction('[Vessel API] Add Vessel Success', props<{ vessel: Vessel }>())
export const dockVesselSuccess = createAction('[Vessel API] Dock Vessel Success', props<{ vessel: Vessel }>())
export const undockVesselSuccess = createAction('[Vessel API] Undock Vessel Success', props<{ vessel: Vessel }>())
export const editNextRoutesSuccess = createAction('[Vessel API] Edit Next Routes Success', props<{ vessel: Vessel }>())
export const loadVesselByIdSuccess = createAction('[Vessel API] Load Vessel By Id Success', props<{ vessel: Vessel }>())

export const loadVesselsFailure = createAction('[Vessel API] Load Vessels Failure', props<{ error: string }>())
export const addVesselFailure = createAction('[Vessel API] Add Vessel Failure', props<{ error: string }>())
export const dockVesselFailure = createAction('[Vessel API] Dock Vessel Failure', props<{ error: string }>())
export const undockVesselFailure = createAction('[Vessel API] Undock Vessel Failure', props<{ error: string }>())
export const editNextRoutesFailure = createAction('[Vessel API] Edit Next Routes Failure', props<{ error: string }>())
export const loadVesselByIdFailure = createAction('[Vessel API] Load Vessel By Id Failure', props<{ error: string }>())

export const vesselReducer = createReducer(
    vesselInitialState,
    on(loadVessels, state => ({ ...state, loading: true })),
    on(loadVesselsSuccess, (state, { vessels }) => ({ ...state, vessels, error: null, loading: false })),
    on(loadVesselsFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(addVessel, state => ({ ...state, loading: true })),
    on(addVesselSuccess, (state, { vessel }) => ({ ...state, vessels: [...state.vessels, vessel], error: null, loading: false })),
    on(addVesselFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(dockVessel, state => ({ ...state, loading: true })),
    on(dockVesselSuccess, (state, { vessel }) => {
        const newVessels = state.vessels.map(v => (vessel.id === v.id) ? ({ ...vessel }) : v)
        return { ...state, vessels: [...newVessels], error: null, loading: false }
    }),
    on(dockVesselFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(undockVessel, state => ({ ...state, loading: true })),
    on(undockVesselSuccess, (state, { vessel }) => {
        const newVessels = state.vessels.map(v => (vessel.id === v.id) ? ({ ...vessel }) : v)
        return { ...state, vessels: [...newVessels], error: null, loading: false }
    }),
    on(undockVesselFailure, (state, { error }) => ({ ...state, error, loading: false  })),
    on(editNextRoutes, state => ({ ...state, loading: true })),
    on(editNextRoutesSuccess, (state, { vessel }) => {
        const newVessels = state.vessels.map(v => (vessel.id === v.id) ? ({ ...vessel }) : v)
        return { ...state, vessels: [...newVessels], error: null, loading: false }
    }),
    on(editNextRoutesFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(loadVesselById, state => ({ ...state, loading: true })),
    on(loadVesselByIdSuccess, (state, { vessel }) => ({ ...state, selectedVessel: vessel, error: null, loading: false })),
    on(loadVesselByIdFailure, (state, { error }) => ({ ...state, error, loading: false }))
)

export const selectVesselState = createFeatureSelector<IVessel>('vessel')
export const selectVessels = createSelector(selectVesselState, (vessel: IVessel) => vessel.vessels)
export const selectVesselError = createSelector(selectVesselState, (vessel: IVessel) => vessel.error)
export const selectVesselById = (id: string) => createSelector(selectVesselState, 
    (vessel: IVessel) => vessel.vessels.find(vessel => vessel.id === id)
)
export const selectVessel = createSelector(selectVesselState, state => state.selectedVessel)
export const selectVesselLoading = createSelector(selectVesselState, state => state.loading)