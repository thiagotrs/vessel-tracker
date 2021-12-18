import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { Port } from "src/app/core/models/port.model";
import { Vessel } from "src/app/core/models/vessel.model";

export interface IRoutePlan {
  vessel: Vessel | null
  error: string | null
  loading: boolean
  nextStops: Port[],
  isUnsaved: boolean,
  alertMessage: string | null
}

export const initialRoutePlan: IRoutePlan = {
  vessel: null,
  error: null,
  loading: false,
  nextStops: [],
  isUnsaved: false,
  alertMessage: null
}

export const loadVesselById = createAction('[Route Plan] Load Vessel By Id', props<{ vesselId: string }>())
export const addStop = createAction('[Route Plan] Add Stop', props<{ port: Port }>())
export const removeStop = createAction('[Route Plan] Remove Stop', props<{ index: number }>())
export const saveRoutes = createAction('[Route Plan] Save Routes', props<{ vesselId: string, nextStops:Port[] }>())
export const setAlertMessage = createAction('[Route Plan] Set Alert Message', props<{ message: string }>())
export const cleanAlertMessage = createAction('[Route Plan] Clean Alert Message')

export const loadVesselByIdSuccess = createAction('[Route Plan API] Load Vessel By Id Success', props<{ vessel: Vessel }>())
export const loadVesselByIdFailure = createAction('[Route Plan API] Load Vessel By Id Failure', props<{ error: string }>())

export const routePlanReducer = createReducer(
  initialRoutePlan,
  on(loadVesselById, state => ({ 
    ...state, 
    loading: true, 
    error: null, 
    nextStops: [], 
    isUnsaved: false,
    alertMessage: null
  })),
  on(loadVesselByIdSuccess, (state, { vessel }) => ({ 
    ...state, 
    vessel, 
    nextStops: vessel.nextStops.filter(stop => !(stop.dateIn || stop.dateOut)).map(stop => stop.port),
    error: null,
    loading: false, 
    isUnsaved: false,
    alertMessage: null
  })),
  on(loadVesselByIdFailure, (state, { error }) => ({ 
    ...state, 
    error, 
    vessel: null,
    nextStops: [],
    loading: false,
    isUnsaved: false,
    alertMessage: null
  })),
  on(addStop, (state, { port }) => ({ 
    ...state, 
    nextStops: [...state.nextStops, port], 
    isUnsaved: true,
    error: null,
    loading: false, 
    alertMessage: null
  })),
  on(removeStop, (state, { index }) => ({ 
    ...state, 
    nextStops: state.nextStops.filter((_, idx) => idx !== index), 
    isUnsaved: true,
    error: null,
    loading: false,
    alertMessage: null
  })),
  on(saveRoutes, state => ({ ...state, isUnsaved: false })),
  on(setAlertMessage, (state, { message }) => ({ ...state, alertMessage: message })),
  on(cleanAlertMessage, state => ({ ...state, alertMessage: null }))
)

export const selectRoutePlanState = createFeatureSelector<IRoutePlan>('routePlan')
export const selectRoutePlanError = createSelector(selectRoutePlanState, state => state.error)
export const selectRoutePlanVessel = createSelector(selectRoutePlanState, state => state.vessel)
export const selectRoutePlanLoading = createSelector(selectRoutePlanState, state => state.loading)
export const selectRoutePlanAlertMessage = createSelector(selectRoutePlanState, state => state.alertMessage)
export const selectRoutePlanNextStops = createSelector(selectRoutePlanState, state => state.nextStops)
export const selectRoutePlanIsUnsaved = createSelector(selectRoutePlanState, state => state.isUnsaved)
export const selectRoutePlanCurrentStop = createSelector(selectRoutePlanState, state => state.vessel?.nextStops.find(stop => (stop.dateIn || stop.dateOut)) || null)