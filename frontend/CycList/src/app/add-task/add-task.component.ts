import { Component, ElementRef, INJECTOR, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  //formActive = false;

  constructor(
    private fb: FormBuilder,
    public globals: GlobalsService
    ) {
  }

  ngOnInit(): void {
  }

  addTaskForm() {
    this.globals.formReset();
    this.globals.taskFormActive = true;
  }

  overlay() {
    this.globals.taskFormActive = false;
  }

  async getSuggestedTime() {
    if (!this.globals.form.value.hour || !this.globals.form.value.minute || !this.globals.form.value.tagID) return;
    await this.globals.getSuggestedDuration(this.globals.form.value.hour, this.globals.form.value.minute, this.globals.form.value.tagID);
    this.globals.form.patchValue({ hour: this.globals.sug.hour });
    this.globals.form.patchValue({ minute: this.globals.sug.minute });
  }

  setFormForSubmission() {
    // set frequency:
    if (this.globals.form.value.dayWeekMonth === 'week') {
      let res = "";
      for (let i = 1; i < 8; i++) {
        if (this.globals.taskFormWeek[i-1]) res += i;
      }
      this.globals.form.patchValue({
        frequency: res
      });
    } else if (this.globals.form.value.dayWeekMonth === 'month') {
      this.globals.form.patchValue({
        frequency: this.globals.form.value.tempDueDate.slice(8,10)
      });
    } else if (this.globals.form.value.dayWeekMonth === 'day') {
      this.globals.form.patchValue({
        frequency: this.globals.form.value.frequency.toString()
      });
    }

    // set due time
    if (this.globals.form.value.schedule) {
      this.globals.form.patchValue({
        dueDate: this.globals.form.value.tempDueDate
      });
    } else {
      this.globals.form.patchValue({
        dueDate: this.globals.form.value.tempDueMonth,
        dueTime: null
      });
    }

    // set notify time to int
    if (!this.globals.form.value.notifiable) {
      this.globals.form.patchValue({
        notifyTime: 0
      });
    } else {
      this.globals.form.patchValue({
        notifyTime: parseInt(this.globals.form.value.notifyTime)
      });
    }
  }

  async submitForm() {
    if (!this.globals.form.value.name ||
        this.globals.form.value.schedule && !this.globals.form.value.tempDueDate || 
        !this.globals.form.value.schedule && !this.globals.form.value.tempDueMonth ||
        this.globals.form.value.isRepeat && (
          !this.globals.form.value.schedule ||
          !this.globals.form.value.dayWeekMonth || 
          (this.globals.form.value.dayWeekMonth === 'day' && this.globals.form.value.frequency === 0)
          )
        ) {
      return;
    };
    this.setFormForSubmission();
    console.log(this.globals.form.value);

    this.globals.taskFormActive = false;
    // console.log(this.globals.form.value);
    // send data to back end
    await this.globals.createModifyTask(this.globals.form.value);
    this.globals.formReset();
  }

}
