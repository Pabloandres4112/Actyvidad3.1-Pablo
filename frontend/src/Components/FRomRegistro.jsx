import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RegistroForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contraseña: '',
        rol:''
    });

    useEffect(() => {
        // Realiza la solicitud GET solo una vez al montar el componente para obtener los datos iniciales si es necesario
        axios.get('http://localhost:3000/registrarUsuario')
            .then((res) => {
                // Si necesitas hacer algo con los datos recibidos, puedes actualizar el estado aquí
                // setFormData(res.data); // Por ejemplo, actualizando el estado con los datos obtenidos
            })
            .catch(error => {
                console.error('Error al obtener datos iniciales:', error);
            });
    }, []); // El segundo argumento es un array vacío para que useEffect se ejecute solo una vez al montar el componente

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/registrarUsuario', formData);
            console.log('Registro exitoso:', response.data);
            // Limpiar el formulario después de enviar los datos
            setFormData({
                nombre: '',
                apellido: '',
                email: '',
                contraseña: '',
                rol:''
            });
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    return (
        <div>
            <h2>Formulario de Registro</h2>
            <form onSubmit={handleSubmit} method="post" action="http://localhost:3000/registrarUsuario">
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="contraseña">Contraseña:</label>
                    <input type="password" id="contraseña" name="contraseña" value={formData.contraseña} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="rol">Rol:</label>
                    <input type="text" id="rol" name="rol" value={formData.rol} onChange={handleChange} />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default RegistroForm;
