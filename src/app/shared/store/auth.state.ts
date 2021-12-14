import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { User } from "src/app/core/models/user.model";

export interface IAuth {
    user: User | null,
    isAuth: boolean,
    error: string | null
}

export const authInitialState: IAuth = {
    user: { name: "Admin", email: "admin@admin.com" },
    isAuth: true,
    error: null
}

export const logout = createAction('[Auth] Logout')
export const login = createAction('[Auth] Login', props<{ payload: { email: string, pass: string } }>())
export const signup = createAction('[Auth] Signup', props<{ payload: { name: string, email: string, pass: string } }>())

export const loginSuccess = createAction('[Auth API] Login Success', props<{ user: User }>())
export const loginFailure = createAction('[Auth API] Login Failure', props<{ error: string }>())
export const signupSuccess = createAction('[Auth API] Signup Success', props<{ user: User }>())
export const signupFailure = createAction('[Auth API] Signup Failure', props<{ error: string }>())

export const authReducer = createReducer(
    authInitialState,
    on(logout, state => ({ user: null, isAuth: false, error: null })),
    on(loginSuccess, (state, { user }) => ({ user, isAuth: true, error: null })),
    on(loginFailure, (state, { error }) => ({ user: null, isAuth: false, error })),
    on(signupSuccess, (state, { user }) => ({ user, isAuth: true, error: null })),
    on(signupFailure, (state, { error }) => ({ user: null, isAuth: false, error }))
)

export const selectAuthState = createFeatureSelector<IAuth>('auth')
export const selectIsAuth = createSelector(selectAuthState, (auth: IAuth) => auth.isAuth)
export const selectUser = createSelector(selectAuthState, (auth: IAuth) => auth.user)
export const selectAuthError = createSelector(selectAuthState, (auth: IAuth) => auth.error)