import { Injectable } from '@angular/core';
import  jsPDF from 'jspdf';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class PdfmakeService {

  constructor() { }
  
  generatePdf(TaskList: Task[], title: string) {
    const doc = new jsPDF();
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 255);
    doc.text(title, 10, 10);
    doc.setFontSize(12);
    doc.setTextColor(100);
    let i = 0;
    TaskList.forEach((task) => {
      doc.text(`${i + 1}. ${task.description}`, 10, 30 + i * 10);
      i++;
    }
    );


  
      doc.save('example.pdf');
    
  }
 
  
}
