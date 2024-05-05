import { createFeatureSelector, createSelector, createSelectorFactory } from "@ngrx/store";
import { TASK } from "./todo.model";


export const selectUsers = createFeatureSelector<TASK[]>('users')