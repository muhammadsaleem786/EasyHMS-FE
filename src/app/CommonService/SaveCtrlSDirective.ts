import { Component, Injectable, HostListener,Directive } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
@Injectable()
export class SaveCtrlSDirective {
   
    constructor(private ngForm: NgForm) {
    }

    @HostListener('document:keydown.control.s', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        event.preventDefault();
        (this.ngForm as { submitted: boolean }).submitted = true;
        this.ngForm.ngSubmit.emit(this.ngForm);
    }

}

