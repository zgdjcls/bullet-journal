import { Component, OnInit, Input } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() 
  name: string = "";

  @Input() 
  dueTime: string = "";

  @Input() 
  dueDate: string = "";

  @Input() 
  year: string = "";

  @Input() 
  month: string = "";

  @Input() 
  day: string = "";

  @Input()
  color: string = "";

  constructor(public globals: GlobalsService) { 
    // this.tags = this.globals.getTags();
    // this.taskTag = GlobalsService.getTag(this.tagID);
    
    // if (this.tagID) {
    //   GlobalsService.getTag(this.tagID);
    //   this.taskTag = GlobalsService.getTags();

    //   console.log("TASK TAG")
    //   console.log(this.taskTag);
    //   console.log("END TASK TAG")
    // } 

    // set timeout for notification
    // TODO: add task dueTime and dueDate
    // TODO: add notifications
    // TODO: add tags and class=tag.color
    // time = this.year
    // setTimeout(function(){alert("It's 10am!")}, (new Date('2022-07-05 22:14'))-(new Date()))

  }
  // constructor(private dailyView: DailyViewComponent) { }


  ngOnInit(): void {
  }

  addTaskForm() {
    this.globals.form.patchValue({name: this.name});
    this.globals.form.patchValue({startTime: this.startTime});
    this.globals.form.patchValue({year: this.year});
    this.globals.form.patchValue({month: this.month});
    this.globals.form.patchValue({day: this.day});
    this.globals.form.patchValue({tagID: this.tagID});
    this.globals.taskFormActive = true;
  }
  
}
