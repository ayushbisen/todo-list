import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TASK } from '../store/todo.model';
import { selectUsers } from '../store/todo.selector';
import { addUser, deleteUserData, editUserData, getUsers } from '../store/todo.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'author', 'title', 'actions'];
  public columnsToDisplay: string[] = this.displayedColumns.slice();
  public data: TASK[] = [];
  public isEditMode = false;
  public editObj: TASK = {} as TASK;
  public userFromControlsGroup: FormGroup | undefined;
  public positions: string[] = ['P1', 'P2', 'P3'];
  private users$: Observable<TASK[]> = this.store.pipe(select(selectUsers))

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.generateFrom();
    this.store.dispatch(getUsers());
    this.users$.pipe().subscribe((res) => {
      this.data = res;
    })

  }

  // This function generate form controls. 
  public generateFrom() {
    this.userFromControlsGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })
  }

  // This function edit or add data based on condition.
  public onSubmit(event: any) {
    if (!this.userFromControlsGroup?.valid) {
      this.userFromControlsGroup?.touched;
      return
    }
    if (!this.isEditMode) {
      this.store.dispatch(addUser({ userData: event.value }))
      this.onResetForm();
    } else {
      this.store.dispatch(editUserData({ id: this.editObj.id ? this.editObj.id : 0, data: event.value }))
      this.isEditMode = false;
      this.onResetForm();
    }
  }

  // This function delete data based.
  public onDeleteClick(e: any) {
    this.store.dispatch(deleteUserData({ id: e.id }))
  }

  // This function set data in form for edit.
  public onEditClick(e: TASK) {
    this.editObj = e;
    this.isEditMode = true;
    this.userFromControlsGroup?.controls['title'].setValue(e.title);
    this.userFromControlsGroup?.controls['priority'].setValue(e.priority);
    this.userFromControlsGroup?.controls['description'].setValue(e.description);

  }

  // This function reset the whole form.
  public onResetForm() {
    this.isEditMode = false;
    this.userFromControlsGroup?.reset();
    this.userFromControlsGroup?.markAsPristine();
    this.userFromControlsGroup?.markAsUntouched();
    this.clearFormErrors(this.userFromControlsGroup);
  }

  // This function reset the all form controls.
  private clearFormErrors(formGroup: FormGroup | undefined) {
    Object.keys(formGroup?.controls ? formGroup?.controls : {})?.forEach(key => {
      const control = formGroup?.get(key);
      control?.markAsUntouched();
      control?.setErrors(null);
      if (control instanceof FormGroup) {
        this.clearFormErrors(control);
      }
    });
  }

}
