// task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { TaskService } from '../services/taskservice/task.service';
import { Task } from '../models/task.model';
import { Router } from '@angular/router'; // Assurez-vous d'importer le service Router
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ExcelServiceService } from '../services/excel/excel-service.service';
import { PdfmakeService } from '../services/pdf/pdfmake.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  


})


export class TaskListComponent implements OnInit {


  tasks: Task[] = [];
  newTaskDescription = '';

  constructor(public authService: AuthService, private taskService: TaskService,private router:Router,private excelService:ExcelServiceService,private pdf:PdfmakeService) {}

  ngOnInit(): void {
    this.refreshTasks();
  }

  logout() {

    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addTask() {
    if (this.newTaskDescription.trim() !== '') {
      // Ajoutez la nouvelle tâche à la liste
      this.taskService.addTask({
        id: this.tasks.length + 1,
        description: this.newTaskDescription,
        completed: false
      });

      // Réinitialisez la description du nouveau formulaire de tâche
      this.newTaskDescription = '';

      // Rafraîchissez la liste des tâches après l'ajout
      this.refreshTasks();
    }
  }

  private refreshTasks() {
    // Récupérez les tâches à partir du service
    this.tasks = this.taskService.getTasks();
  }

  DoneTask(task:Task){ {
    task.completed = true;
    throw new Error('Method not implemented.');
    }} 
    
    
    DeleteTask(task:Task){ {
      this.taskService.deleteTask(task);
      this.refreshTasks();
      throw new Error('Method not implemented.');
      }}

      onDrop(event: CdkDragDrop<Task[]>) {
        moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
      }


      onFileChange(event: any): void {
        const file = event.target.files[0];
    
        if (file) {
          this.excelService.readExcel(file)
            .then((jsonData) => {
              console.log('Données JSON :', jsonData);
              console.log(jsonData); 
              
              for (let i = 0; i < jsonData.length; i++) {
                this.taskService.addTask({
                  id: this.tasks.length + 1,
                  description: jsonData[i].description,
                  completed: false
                });
              }
            })
            .catch((error) => {
              console.error('Erreur lors de la lecture du fichier Excel :', error);
            });
        }
      }

      generatePdf(){
        this.pdf.generatePdf(this.tasks,'Liste des tâches');
        
      }
      
}
