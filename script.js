// ===== Login Page Logic =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('loggedInUser', JSON.stringify(data.user));
        window.location.href = 'home.html';
      } else {
        errorMsg.textContent = data.message || 'Login failed';
      }
    } catch (err) {
      console.error(err);
      errorMsg.textContent = 'Could not reach server. Is the backend running?';
    }
  });
}

// ===== Home Page Logic =====
const userNameEl = document.getElementById('userName');
if (userNameEl) {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (user) {
    userNameEl.textContent = `Welcome, ${user.nickname}`;

    const badge = document.getElementById('userBadge');
    if (user.adminrights === true || user.adminrights === 'true') {
      badge.textContent = 'Admin';
      badge.classList.add('admin');
    } else {
      badge.textContent = 'Regular User';
    }
  } else {
    window.location.href = 'login.html';
  }
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
  });
}