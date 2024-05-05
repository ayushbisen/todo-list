import { Action, createAction, props } from "@ngrx/store";
import { TASK } from "./todo.model";

export enum ActionType {
    GET_USER_DATA = "USER : GET_USER_DATA",
    GET_USER_DATA_SUCCESS = "USER : GET_USER_DATA_SUCCESS",

    CREATE_USER_DATA = "USER : CREATE_USER_DATA",
    CREATE_USER_DATA_SUCCESS = "USER : CREATE_USER_DATA_SUCCESS",

    DELETE_USER_DATA = "USER : DELETE_USER_DATA",
    DELETE_USER_DATA_SUCCESS = "USER : DELETE_USER_DATA_SUCCESS",

    UPDATE_USER_DATA = "USER : UPDATE_USER_DATA",
    UPDATE_USER_DATA_SUCCESS = "USER : UPDATE_USER_DATA_SUCCESS"
}


export const getUsers = createAction(
    ActionType.GET_USER_DATA
)

export const getUsersSuccess = createAction(
    ActionType.GET_USER_DATA_SUCCESS,
    props<{ users: TASK[] }>()
)

export const addUser = createAction(
    ActionType.CREATE_USER_DATA,
    props<{ userData: TASK }>()
)

export const addUserSuccess = createAction(
    ActionType.CREATE_USER_DATA_SUCCESS,
    props<{ successData: any }>()
)


export const deleteUserData = createAction(
    ActionType.DELETE_USER_DATA,
    props<{ id: number }>()
)

export const deleteUserDataSuccess = createAction(
    ActionType.DELETE_USER_DATA_SUCCESS,
    props<{ id: number }>()
)

export const editUserData = createAction(
    ActionType.UPDATE_USER_DATA,
    props<{ id: number, data: TASK }>()
)

export const editUserDataSuccess = createAction(
    ActionType.UPDATE_USER_DATA_SUCCESS,
    props<{ id: number, editedData: TASK }>()
)