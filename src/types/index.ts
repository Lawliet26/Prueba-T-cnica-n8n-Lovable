export interface Oposicion {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  categoriaId?: number;
  provincia: string;
  provinciaId?: number;
  fechaConvocatoria: string;
  plazas: number;
  estado: 'abierta' | 'cerrada' | 'proxima';
  urlBasesOficiales?: string;
  tieneTemarioListo?: boolean;
}


export interface User {
  profesor_id?: string;
  id: string;
  username: string;
  nombre: string;
  rol: 'PROFESOR' | 'ESTUDIANTE';
}
