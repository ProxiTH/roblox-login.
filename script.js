/* ========================================
   Roblox Login Page - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginBtn = loginForm.querySelector('.login-button');
    const eyeIcon = togglePasswordBtn.querySelector('.eye-icon');

    // Alternar visibilidad de contraseña
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
    });

    // Manejo del envío del formulario
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Validación básica
        if (!username || !password) {
            showError('Por favor, completa todos los campos.');
            shakeForm();
            return;
        }

        // Simular proceso de inicio de sesión
        simulateLogin(username, password);
    });

    // Simular inicio de sesión (frontend demo)
    function simulateLogin(username, password) {
        // Cambiar estado del botón a cargando
        setButtonLoading(true);
        hideError();

        // Simular retraso de red
        setTimeout(() => {
            // En una aplicación real, aquí se haría una petición a la API
            // Por ahora, simulamos un inicio de sesión exitoso o fallido
            const demoUsers = [
                { username: 'usuario', password: '123456' },
                { username: 'admin', password: 'admin123' },
                { username: 'roblox', password: 'roblox2026' }
            ];

            const user = demoUsers.find(u => u.username === username || u.username === username.toLowerCase());

            if (user && user.password === password) {
                // Éxito
                loginBtn.style.backgroundColor = 'var(--success)';
                loginBtn.textContent = '¡Inicio de sesión exitoso!';
                
                setTimeout(() => {
                    alert(`¡Bienvenido de nuevo, ${username}! Has iniciado sesión correctamente en Roblox (demo).`);
                    resetButton();
                }, 1000);
            } else {
                // Fallo
                showError('Nombre de usuario o contraseña incorrectos.');
                shakeForm();
                resetButton();
            }
        }, 1500);
    }

    // Cambiar estado del botón (cargando)
    function setButtonLoading(loading) {
        if (loading) {
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
            loginBtn.textContent = '';
        } else {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            loginBtn.textContent = 'Iniciar sesión';
        }
    }

    // Restablecer botón
    function resetButton() {
        setButtonLoading(false);
        loginBtn.style.backgroundColor = 'var(--roblox-red)';
        loginBtn.textContent = 'Iniciar sesión';
    }

    // Mostrar mensaje de error
    function showError(message) {
        let errorEl = document.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            loginForm.insertBefore(errorEl, loginForm.firstChild);
        }
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }

    // Ocultar mensaje de error
    function hideError() {
        const errorEl = document.querySelector('.error-message');
        if (errorEl) {
            errorEl.classList.remove('show');
            setTimeout(() => {
                if (errorEl) errorEl.remove();
            }, 300);
        }
    }

    // Animación de sacudida para errores
    function shakeForm() {
        loginForm.classList.add('shake-animation');
        setTimeout(() => {
            loginForm.classList.remove('shake-animation');
        }, 400);
    }

    // Limpiar errores al escribir
    usernameInput.addEventListener('input', hideError);
    passwordInput.addEventListener('input', hideError);

    // Enlaces del footer (prevenir navegación real en demo)
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`Función de demo: ${link.textContent} (enlace no funcional en esta demostración)`);
        });
    });

    // Enlace de registro
    const signupLink = document.querySelector('.signup-link');
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Función de demo: Registro no disponible en esta demostración.');
    });

    // Enlaces sociales (prevenir navegación real en demo)
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = btn.textContent.replace('Iniciar sesión con ', '').trim();
            alert(`Función de demo: Inicio de sesión con ${provider} no disponible en esta demostración.`);
        });
    });
});