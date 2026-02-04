import { RecursoGet, RecursosResponse } from '@/types';
import api from '../config/api';

export const recursosService = {
  async uploadRecurso(formData: FormData): Promise<void> {
    try {
      await api.post('/recursos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error subiendo recurso:', error);
      throw error;
    }
  },

  async getRecursosByOposicion(oposicionId: number): Promise<RecursoGet[]> {
    try {
      const response = await api.get<RecursosResponse[]>(
        `/obtener-recursos?oposicion_id=${oposicionId}`
      );

      if (response.data && response.data[0] && response.data[0].recursos) {
        return response.data[0].recursos;
      }

      return [];
    } catch (error) {
      console.error('Error obteniendo recursos:', error);
      throw error;
    }
  }
};