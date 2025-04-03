function enviarConfirmacion() {
    const apellido = document.getElementById('apellido').value.trim();
    const asistentes = document.getElementById('asistentes').value;
    
    if (!apellido || !asistentes) {
        alert('Por favor complete todos los campos');
        return;
    }

    // Reemplaza con tu URL de Apps Script publicada
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxWFNbAazVwmwdi9wOERdNmk_4W33AfIGnXtdai_COBU0lKH1xkdGT_aFJNduitBrVgbQ/exec';
    
    const loading = document.getElementById('loading');
    const mensajeExito = document.getElementById('mensajeExito');
    const boton = document.querySelector('button');
    
    loading.style.display = 'block';
    boton.disabled = true;
    mensajeExito.style.display = 'none';
    
    fetch(scriptURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `apellido=${encodeURIComponent(apellido)}&asistentes=${encodeURIComponent(asistentes)}`
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        return response.json();
    })
    .then(data => {
        if (data.result === 'success') {
            mensajeExito.textContent = `¡Confirmación exitosa para la familia ${apellido}! (${asistentes} personas)`;
            mensajeExito.style.display = 'block';
            document.getElementById('apellido').value = '';
            document.getElementById('asistentes').value = '';
        } else {
            throw new Error(data.message || 'Error en el servidor');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`Error al enviar: ${error.message}\n\nPor favor intente nuevamente más tarde.`);
    })
    .finally(() => {
        loading.style.display = 'none';
        boton.disabled = false;
    });
}