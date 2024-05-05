import { createReducer, on } from "@ngrx/store";
import { TASK } from "./todo.model";
import { addUserSuccess, deleteUserDataSuccess, editUserDataSuccess, getUsersSuccess } from "./todo.actions";

export const InitialState: TASK[] = [];

export const userReducer = createReducer(
    InitialState,
    on(getUsersSuccess, (state, { users }) => {
        return state = users;
    }),
    on(addUserSuccess, (state, { successData }) => {
        let newState = [...state];
        newState.unshift(successData);
        return newState;
    }),
    on(deleteUserDataSuccess, (state, { id }) => {
        let newState = [...state];
        newState = newState.filter(i => i.id !== id);
        return newState;
    }),
    on(editUserDataSuccess, (state, { id, editedData }) => {
        let newState = [...state];
        newState = newState.filter(i => i.id !== id);
        newState.unshift(editedData);
        return newState;
    })
)