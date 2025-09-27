export interface Activity {
  id?: number;            // opcional: la base de datos lo asigna
  title: string;          // nombre de la actividad
  description?: string;   // detalle
  dueDate?: string;       // fecha límite (ISO string)
  priority?: 'low'|'medium'|'high'; // prioridad
  done?: boolean;         // completada o no
  createdAt?: string;     // fecha de creación
}
