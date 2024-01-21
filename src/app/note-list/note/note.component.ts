import { Component, Input } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { NoteListService } from '../../firebase-services/note-list.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  @Input() note!: Note;
  edit = false;
  hovered = false;

  constructor(private noteService: NoteListService) {}

  changeMarkedStatus() {    
    this.note.marked = !this.note.marked;
    this.saveNote();
  }

  deleteHovered() {    
    if (!this.edit) {
      this.hovered = false;
    }
  }

  openEdit() {
    this.edit = true;
  }

  closeEdit() {
    this.edit = false;
    this.saveNote();
  }

  moveToTrash() {
    console.log("5");
    if (this.note.id) {
      this.note.type = "trash";
      let docId = this.note.id;
      delete this.note.id;      
      this.noteService.addNote(this.note, "trash");      
      this.noteService.deleteNote("notes", docId);
    }
  }

  moveToNotes() {
    console.log("6");
    // if (this.note.id) {
    //   this.note.type = 'note';
    //   let docId = this.note.id;
    //   delete this.note.id;
    //   this.noteService.addNote(this.note, 'notes');
    //   this.noteService.deleteNote('trash', docId);
    // }
  }

  deleteNote() {
    console.log("7");
    if (this.note.id) {
      this.noteService.deleteNote('trash', this.note.id);      
    }
  }

  saveNote() {
    console.log("8");
    this.noteService.updateNote(this.note);
  }
}
