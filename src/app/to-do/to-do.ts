import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaService } from '../../services/tarea-service';
import { Activity } from '../activity.model';
import { CommonModule } from '@angular/common';          // ← *ngIf, *ngFor, etc.
import { ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.html',
  styleUrls: ['./to-do.scss'],
  standalone: true,
   imports: [
    CommonModule,       // <-- IMPORTANTE para *ngIf, *ngFor
    ReactiveFormsModule, // <-- IMPORTANTE para Reactive Forms
    HttpClientModule
  ]
})
export class ToDo implements OnInit {
  activities: Activity[] = [];
  loading = false;
  error = '';
  form: FormGroup;
  editing = false;
  editingId?: number;
  showForm = false;

  constructor(
    private svc: TareaService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(120)]],
      description: [''],
      dueDate: [''],
      priority: ['medium'],
      done: [false]
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.list()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => this.activities = res.sort((a, b) => (a.done === b.done) ? 0 : (a.done ? 1 : -1)),
        error: () => this.error = 'No se pudieron cargar actividades.'
      });
  }

  openNew() {
    this.form.reset({ priority: 'medium', done: false });
    this.editing = false;
    this.editingId = undefined;
    this.showForm = true;
  }

  openEdit(act: Activity) {
    this.form.patchValue({
      title: act.title,
      description: act.description,
      dueDate: act.dueDate ? act.dueDate.slice(0, 10) : '',
      priority: act.priority || 'medium',
      done: !!act.done
    });
    this.editing = true;
    this.editingId = act.id;
    this.showForm = true;
  }

  save() {
    if (this.form.invalid) return;

    const payload: Activity = {
      title: this.form.value.title,
      description: this.form.value.description,
      dueDate: this.form.value.dueDate ? new Date(this.form.value.dueDate).toISOString() : undefined,
      priority: this.form.value.priority,
      done: this.form.value.done
    };

    const request = this.editing && this.editingId != null
      ? this.svc.update(this.editingId, payload)
      : this.svc.create(payload);

    request.subscribe({
      next: () => {
        this.showForm = false;
        this.load();
      },
      error: () => this.error = this.editing ? 'Error actualizando actividad.' : 'Error creando actividad.'
    });
  }

  cancel() {
    this.showForm = false;
    this.editing = false;
    this.editingId = undefined;
  }

  toggleDone(act: Activity) {
    if (!act.id) return;
    this.svc.patch(act.id, { done: !act.done }).subscribe({
      next: () => this.load(),
      error: () => this.error = 'No se pudo cambiar el estado.'
    });
  }

  confirmAndDelete(act: Activity) {
    if (!act.id) return;
    if (!confirm(`Eliminar "${act.title}"? Esta acción no se puede deshacer.`)) return;
    this.svc.delete(act.id).subscribe({
      next: () => this.load(),
      error: () => this.error = 'No se pudo eliminar la actividad.'
    });
  }

  shortDate(dt?: string) {
    if (!dt) return '-';
    const d = new Date(dt);
    return d.toLocaleDateString();
  }
}
