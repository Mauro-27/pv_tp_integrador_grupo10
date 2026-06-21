import { useState } from 'react';

export const useValidarForm = (estadoInicial) => {
  const [formData, setFormData] = useState(estadoInicial);

  const [validaciones, setValidaciones] = useState({
    nombre: false,
    apellido: false,
    mail: false,
    cel: false,
    ciudad: false
  });

  const formatearTexto = (texto) => {
    return texto
      .split(' ')
      .map(palabra => palabra.length > 0 ? palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase() : '')
      .join(' ');
  };

  const validarCampo = (nombreCampo, valor) => {
    switch (nombreCampo) {
      case 'nombre':
      case 'apellido':
      case 'ciudad':
        return valor.trim().length > 0; 
      case 'mail':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
      case 'cel':
        return valor.length === 10; 
      default:
        return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nuevoValor = value;

    if (name === 'nombre' || name === 'apellido' || name === 'ciudad') {
      nuevoValor = formatearTexto(nuevoValor);
    } else if (name === 'cel') {
      nuevoValor = nuevoValor.replace(/\D/g, '').slice(0, 10);
    }

    setFormData({ ...formData, [name]: nuevoValor });

    setValidaciones({
      ...validaciones,
      [name]: validarCampo(name, nuevoValor)
    });
  };

  const resetForm = () => {
    setFormData(estadoInicial);
    setValidaciones({ nombre: false, apellido: false, mail: false, cel: false, ciudad: false });
  };

  const formularioValido = Object.values(validaciones).every((v) => v === true);

  return {
    formData,
    validaciones,
    formularioValido,
    handleChange,
    resetForm
  };
};