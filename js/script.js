document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado de enviar el formulario

    // Valores fijos para usuario y contraseña
    const fixedUsername = 'mor_2314';
    const fixedPassword = '83r5^_';

    // Obtener los valores ingresados por el usuario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificar si coinciden con los valores fijos
    if (username === fixedUsername && password === fixedPassword) {
        // Redirigir a productos.html si el inicio de sesión es exitoso
        window.location.href = './productos.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});
