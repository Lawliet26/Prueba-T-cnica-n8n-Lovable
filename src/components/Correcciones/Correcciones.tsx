import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapse, Button, message, Tag, Space, Spin } from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  UserOutlined,
  LinkOutlined
} from '@ant-design/icons';
import { correccionesService } from '../../services/correccionesService';
import { useAuth } from '../../context/AuthContext';
import './Correcciones.css';

const { Panel } = Collapse;

const Correcciones: React.FC = () => {
  const { user } = useAuth();
  const [correcciones, setCorrecciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Cargar correcciones del API
  useEffect(() => {
    const fetchCorrecciones = async () => {
      try {
        setLoading(true);
        const data = await correccionesService.getCorrecciones();
        setCorrecciones(data);
      } catch (error) {
        message.error('Error al cargar las correcciones');
      } finally {
        setLoading(false);
      }
    };

    fetchCorrecciones();
  }, []);

  const handleAprobar = async (id: string) => {
    setActionLoading(true);
    try {
      await correccionesService.aprobar(
        parseInt(user?.profesor_id || '0'),
        parseInt(id)
      );
      
      setCorrecciones(prev => 
        prev.map(c => c.id === id ? { ...c, estado: 'aprobado' as const } : c)
      );
      
      message.success('Corrección aprobada correctamente');
    } catch (error) {
      message.error('Error al aprobar la corrección');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRechazar = async (id: string) => {
    setActionLoading(true);
    try {
      await correccionesService.rechazar(
        parseInt(user?.profesor_id || '0'),
        parseInt(id)
      );
      
      setCorrecciones(prev => 
        prev.map(c => c.id === id ? { ...c, estado: 'rechazado' as const } : c)
      );
      
      message.warning('Corrección rechazada');
    } catch (error) {
      message.error('Error al rechazar la corrección');
    } finally {
      setActionLoading(false);
    }
  };

  const getEstadoTag = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <Tag color="blue">Pendiente de Revisión</Tag>;
      case 'aprobado':
        return <Tag color="green">Aprobado</Tag>;
      case 'rechazado':
        return <Tag color="red">Rechazado</Tag>;
      default:
        return null;
    }
  };

  const correccionesPendientes = correcciones.filter(c => c.estado === 'pendiente');

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Cargando correcciones..." />
      </div>
    );
  }

  return (
    <motion.div
      className="correcciones-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Correcciones
        </motion.h1>
        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Revisa las correcciones realizadas
        </motion.p>
      </div>

      <AnimatePresence>
        <Collapse
          className="correcciones-collapse"
          accordion
          expandIconPosition="end"
        >
          {Array.isArray(correcciones) &&
            correcciones.length > 0 &&
            correcciones.some(c => Array.isArray(c.temas) && c.temas.length > 0) && 
            correcciones.map((correcion, index) => (
            <Panel
              key={correcion.id}
              header={
                <motion.div
                  className="correcion-header"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="correcion-header-content">
                    <h3 className="correcion-title">{correcion.titulo}</h3>
                    <div className="correcion-meta">
                      <Space size="middle">
                        <span><UserOutlined /> {correcion.candidato}</span>
                        {getEstadoTag(correcion.estado)}
                      </Space>
                    </div>
                  </div>

                  <div className="correccion-actions">
                    <Button
                      type="primary"
                      icon={<CheckCircleOutlined />}
                      onClick={() => handleAprobar(correcion.id)}
                      loading={actionLoading}
                      className="btn-aprobar"
                    >
                      Aprobar
                    </Button>
                    <Button
                      icon={<CloseCircleOutlined />}
                      onClick={() => handleRechazar(correcion.id)}
                      className="btn-corregir"
                    >
                      Rechazar
                    </Button>
                  </div>
                </motion.div>
              }
            >
              <div className="correcion-content">
                {Array.isArray(correcion.temas) && correcion.temas.map((tema, tIndex) => (
                  <div key={tIndex} className="tema-section">
                    <h4>{tema.titulo}</h4>

                    {tema.recursos_vinculados.map((recurso, rIndex) => (
                      <div key={rIndex} className="documento-item">
                        <Space size="middle">
                          <Tag color="blue">{recurso.ley_detectada}</Tag>
                          <Tag color="green">
                            {parseFloat(recurso.coincidencia_maxima).toFixed(2)}%
                          </Tag>
                          <a
                          href={recurso.url_pdf_evidencia}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="documento-link"
                        >
                          <LinkOutlined /> Ver PDF Evidencia
                        </a>
                        </Space>
                      
                        {recurso.fragmentos_notas?.length > 0 && (
                          <div className="notas-section">
                            <h4>Notas:</h4>
                            <ul>
                              {recurso.fragmentos_notas.map((n, i) => (
                                <li key={i}>
                                  {n.nota} ({n.coincidencia}%)
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Panel>
          ))}
        </Collapse>
      </AnimatePresence>
    </motion.div>
  );
};

export default Correcciones;
