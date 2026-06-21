import { useState, useEffect, useRef } from "react";
import apiService from "../service/apiService.js";

export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ultimaModificacion, setUltimaModificacion] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [notificacion, setNotificacion] = useState({ open: false, mensaje: '', severity: 'success' });

  const primerRender = useRef(true);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      setError(null);
      try {
        const clientesGuardados = localStorage.getItem('api_clientes_data');
        
        if (clientesGuardados) {
          setClientes(JSON.parse(clientesGuardados));
        } else {
          const datosAPI = await apiService.obtenerClientesAPI();
          setClientes(datosAPI);
          localStorage.setItem('api_clientes_data', JSON.stringify(datosAPI));
        }
      } catch (err) {
        setError("Error de conexión: No se pudo cargar la información del servidor.");
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    if (!cargando && error === null) {
      localStorage.setItem('api_clientes_data', JSON.stringify(clientes));
    }
  }, [clientes, cargando, error]);

  useEffect(() => {
    if (primerRender.current) {
      primerRender.current = false;
      return;
    }
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const hora = ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
    setUltimaModificacion(`${fecha} a las ${hora} hs.`);
  }, [clientes]);

  const manejarAgregarCliente = async (nuevoCliente) => {
   try {
      await apiService.agregarClienteAPI(nuevoCliente);
      const nuevoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
      setClientes([...clientes, { ...nuevoCliente, id: nuevoId }]);
      setNotificacion({ open: true, mensaje: `¡Cliente creado exitosamente! ID: ${nuevoId}`, severity: 'success' });
    } catch (err) {
      setNotificacion({ open: true, mensaje: err.message, severity: 'error' });
    }
  };

  const manejarEliminar = async (id) => {
    try {
      await apiService.eliminarClienteAPI(id);
      setClientes(clientes.filter(cliente => cliente.id !== id));
      setNotificacion({ open: true, mensaje: 'Cliente eliminado correctamente', severity: 'success' });
    } catch (err) {
      setNotificacion({ open: true, mensaje: err.message, severity: 'error' });
    }
  };

  const clientesFiltrados = clientes.filter((c) => {
    const texto = busqueda.toLowerCase();
    const apellido = c.name?.lastname || '';
    const ciudad = c.address?.city || '';
    return apellido.toLowerCase().startsWith(texto) || ciudad.toLowerCase().startsWith(texto);
  });

  return {
    busqueda,
    setBusqueda,
    cargando,
    error,
    notificacion,
    setNotificacion,
    clientesFiltrados,
    manejarAgregarCliente,
    manejarEliminar
  };
};