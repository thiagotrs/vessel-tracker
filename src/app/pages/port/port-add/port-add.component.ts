import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Port } from 'src/app/core/models/port.model';
import { PortService } from 'src/app/shared/services/port.service';

@Component({
  selector: 'app-port-add',
  templateUrl: './port-add.component.html',
  styles: []
})
export class PortAddComponent implements OnInit {

  constructor(private portService: PortService) { }

  ngOnInit(): void {
  }

  onSubmit(myForm:NgForm) {
    const port = { 
      name: myForm.form.value.name, 
      location: { 
        city: myForm.form.value.location.city, 
        country: myForm.form.value.location.country 
      }, 
      capacity: myForm.form.value.capacity 
    } as Port
    
    this.portService.createPort(port)
  }

  clear(myForm:NgForm) {
    myForm.form.reset();
  }

}
