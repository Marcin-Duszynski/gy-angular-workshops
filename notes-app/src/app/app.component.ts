import { Component, OnInit } from '@angular/core';
import { Note } from './notes/note.model';
import { NotesService } from './notes/notes.service';

enum NotesViewState {
  display = 0,
  create = 1
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notes: Note[] = [];
  selectedNote: Note;
  viewState = NotesViewState.display;

  notesViewStateRef = NotesViewState;

  constructor(private notesService: NotesService) {
  }

  ngOnInit() {
    this.fetchNotes();
  }

  onSelectedItem(note: Note) {
    this.selectedNote = note;
    this.viewState = NotesViewState.display;
  }

  onCreatedItem(note: Note) {
    this.notesService.push(note).subscribe(() => this.fetchNotes());
    this.viewState = NotesViewState.display;
  }

  createNote() {
    this.viewState = NotesViewState.create;
  }

  private fetchNotes() {
    this.notesService.get().subscribe(notes => {
      this.notes = notes;
      this.selectedNote = this.notes[0];
    });
  }
}
