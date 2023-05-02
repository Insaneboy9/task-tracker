import { Component } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [];

  constructor (private taskService: TaskService){
  }

  ngOnInit():void {
    this.taskService.getTasks().subscribe((tasks)=>(this.tasks = tasks)); //something like promise
  }

  deleteTask(task: Task){
    this.taskService.deleteTask(task).subscribe(()=>(this.tasks = this.tasks.filter(t => t.id != task.id)));//promise to refresh data to the ones that are not deleted
  }

  toggleReminder(task:Task){
    task.reminder = !task.reminder; // to refresh on the spot
    this.taskService.updateTaskReminder(task).subscribe()
  }

  addTask(task:Task){
    this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task)
    })
  }

}
