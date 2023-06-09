import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() 
  _id: string = "";

  @Input() 
  name: string = "";

  @Input() 
  content: string = "";

  @Input() 
  schedule: boolean = false;

  @Input() 
  dueTime: string = "";

  @Input() 
  isRepeat: boolean = false;

  @Input() 
  tag: string = "";

  @Input()
  color: string = "";

  @Input()
  dayWeekMonth: string = "";

  @Input() 
  dueDate: string = "";

  @Input() 
  frequency: string = "";

  @Input() 
  hour: string = "";

  @Input() 
  minute: string = "";

  @Input()
  notifiable: boolean = false;

  @Input()
  notifyTime: number = 0;


  // vvv Signifiers: completed, important, abandoned
  @Input()
  completed: boolean = false;

  @Input()
  important: boolean = false;

  @Input()
  abandoned: boolean = false;


  sigMenuShown : Boolean = false;
  completionFormShown : Boolean = false;
  taskCompletionForm : FormGroup;
  actualTimeOutOfRangeError : Boolean = false;

  view: boolean = false;
  date: string = "";
  tagName: string = "";

  toggleSigMenu() {
    if(!this.completionFormShown) {
      this.sigMenuShown = !this.sigMenuShown;
    }
  }

  showDetails() {
    this.view = !this.view;
    if (!this.hour || !this.minute || !this.tag) return;
    this.globals.getSuggestedDuration(parseInt(this.hour), parseInt(this.minute), this.tag);
  }

  hideDetails() {
    this.view = false;
    this.sigMenuShown = false;
    this.completionFormShown = false;
    this.globals.sug = { hour:0, minute:0 };
  }

  /**
   * Toggle a task's completed signifier. If task is not completed, then display
   * the task completion time form for the user to fill out.
   */
  sigMarkCompleted() {
    if(!this.completed) {
      this.sigMenuShown = false;
      this.completionFormShown = true;
    }
    else {
      this.globals.completeTask(this._id, false, 0, 0);
      this.completed = false;
    }
  }

  submitTaskCompletion() {
    let hour: number = this.taskCompletionForm.get("hour")?.value;
    let minute: number = this.taskCompletionForm.get("minute")?.value;

    if(hour*60 + minute <= 0) {
      this.actualTimeOutOfRangeError = true;
    }

    this.globals.completeTask(this._id, true, hour, minute);
    this.completed = true;
    this.completionFormShown = false;
  }

  toggleSigImportant() {
    this.important = !this.important;
    this.globals.markSignifier(this._id, this.important, this.completed, this.abandoned);
  }
  
  toggleSigAbandoned() {
    this.abandoned = !this.abandoned;
    this.globals.markSignifier(this._id, this.important, this.completed, this.abandoned);
  }


  constructor(public globals: GlobalsService, private formBuilder: FormBuilder) { 
    this.taskCompletionForm = this.formBuilder.group({
      hour: 0,
      minute: 0
    });
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
    this.date = (new Date(this.dueDate)).toString().slice(0,15);
    if (!this.globals.tags) return;
    for (let tag of this.globals.tags) {
      if (tag._id === this.tag) {
        this.tagName = tag.name;
      }
    }
  }

  addTaskForm() {
    // make sure form is cleared before editing
    this.globals.formReset();
    this.globals.form.patchValue({_id: this._id});
    this.globals.form.patchValue({name: this.name});
    this.globals.form.patchValue({content: this.content});
    this.globals.form.patchValue({schedule: this.schedule});
    this.globals.form.patchValue({dueTime: this.dueTime});
    this.globals.form.patchValue({isRepeat: this.isRepeat});
    this.globals.form.patchValue({tagID: this.tag});
    this.globals.form.patchValue({color: this.color});
    this.globals.form.patchValue({dayWeekMonth: this.dayWeekMonth});
    this.globals.form.patchValue({hour: this.hour});
    this.globals.form.patchValue({minute: this.minute});
    this.globals.form.patchValue({notifiable: this.notifiable});
    this.globals.form.patchValue({notifyTime: this.notifyTime});
    
    if(this.schedule){
      this.globals.form.patchValue({tempDueDate: this.dueDate});
    }else{
      this.globals.form.patchValue({tempDueMonth: this.dueDate});
    }

    this.date = (new Date(this.dueDate)).toString().slice(0,9);
    
    // console.log(this.globals.form.value);
    //testing below
    //this.globals.form.patchValue({isRepeat: true});
    //this.frequency = "136";
    //this.globals.form.patchValue({dayWeekMonth: 'week'});
    //this.dayWeekMonth = 'week'

    if(this.dayWeekMonth === 'day'){
      this.globals.form.patchValue({frequency: parseInt(this.frequency)});
    }else if(this.dayWeekMonth === 'week'){
      for (let i = 0; i < this.frequency.length; i++) {
        this.globals.taskFormWeek[parseInt((this.frequency)[i])-1] = true;
        // console.log(((this.frequency)[i]));
      }
    }

    // console.log(this.globals.form.value);
    // console.log(this.globals.taskFormWeek);
    this.globals.taskFormActive = true;

    // load directly:
      // _id
      // name
      // content
      // schedule
      // dueTime
      // isRepeat
      // tag   => tagID
      // color
      // dayWeekMonth

    // parse:
      // dueDate  => tempDueDate if schedule is true, else => tempDueMonth
      // frequency  => 
        // if dayWeekMonth is
          // null or 'month' => do nothing
          // 'week' => parse string into taskFormWeek array
          // 'day' => put int value into frequency

  }

  deleteTask() {
    this.globals.deleteTask(this._id);
  }
  
}
