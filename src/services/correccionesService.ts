import api from '../config/api';


export interface CorreccionGrupo {
  temarioId: number;
  titulo: string; // oposicion_nombre
  temas: {
    titulo: string;
    detalles: {
      id: string;
      candidato: string;
      notas: string;
      documentos: string[];
      estado: 'pendiente' | 'aprobado' | 'corregir';
      temaAcademiaId: number;
    }[];
  }[];
}

interface TemarioDecisionPayload {
  profesor_id: number;
  temario_id: number;
  accion: 'APROBADO' | 'RECHAZADO';
  comentarios: string;
}

export const correccionesService = {
  // Obtener lista de correcciones
  async getCorrecciones(): Promise<any[]> {
    try {
      const response = await api.get<any[]>('/lista-correciones');

      return response.data.map(correcion => {
        return {
          id: String(correcion.temario_id),
          titulo: correcion.oposicion_nombre,
          descripcion: 'Correcion del temario',
          candidato: 'Sistema de detección',
          fechaEnvio: new Date().toISOString(),
          estado: 'pendiente' as const,
          temas: correcion.temas_convocatoria
        };
      });
    } catch (error) {
      console.error('Error obteniendo revisiones:', error);
      throw error;
    }
  },

  // Enviar decisión sobre corrección (aprobar o rechazar)
  async enviarDecision(payload: TemarioDecisionPayload): Promise<void> {
    try {
      await api.post('/temario-desicion', payload);
    } catch (error) {
      console.error('Error enviando decisión:', error);
      throw error;
    }
  },

  // Aprobar corrección
  async aprobar(profesorId: number, temarioId: number, comentarios: string = ''): Promise<void> {
    return this.enviarDecision({
      profesor_id: profesorId,
      temario_id: temarioId,
      accion: 'APROBAR',
      comentarios
    });
  },

  // Rechazar corrección
  async rechazar(profesorId: number, temarioId: number, comentarios: string = ''): Promise<void> {
    return this.enviarDecision({
      profesor_id: profesorId,
      temario_id: temarioId,
      accion: 'RECHAZAR',
      comentarios
    });
  }
};
