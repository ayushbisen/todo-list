import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodoServiceService } from "../common/todo-service.service";
import { addUser, addUserSuccess, deleteUserData, deleteUserDataSuccess, editUserData, editUserDataSuccess, getUsers, getUsersSuccess } from "./todo.actions";
import { map, switchMap } from "rxjs";



@Injectable()
export class ToDoEffects {
    constructor(private actions$: Actions, private ser: TodoServiceService) { }

    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUsers),
            switchMap(() => {
                return this.ser.getToDoList().pipe(
                    map((data) => getUsersSuccess({ users: data }))
                )
            })
        )
    )

    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUser),
            switchMap((action) => {
                return this.ser.createTask(action.userData).pipe(
                    map((data) => addUserSuccess({ successData: data }))
                )
            })

        )
    )

    deleteUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteUserData),
            switchMap((action) => {
                return this.ser.deleteTask(action.id).pipe(
                    map((data) => deleteUserDataSuccess({ id: action.id }))
                )
            })
        )
    })

    editUserData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(editUserData),
            switchMap((action) => {
                return this.ser.editTask(action.id, action.data).pipe(
                    map(() => editUserDataSuccess({ id: action.id, editedData: { ...action.data, id: action.id } }))
                )
            })
        )
    })
}







