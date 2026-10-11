let isSignUpMode = false;

document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        showMainContent(loggedInUser);
    }
});

function toggleAuthMode() {
    isSignUpMode = !isSignUpMode;
    const title = document.getElementById("auth-title");
    const btn = document.getElementById("auth-btn");
    const toggleText = document.getElementById("toggle-text");

    if (isSignUpMode) {
        title.innerText = "Đăng Ký";
        btn.innerText = "Tạo Tài Khoản";
        toggleText.innerHTML = 'Đã có tài khoản? <a href="#" onclick="toggleAuthMode()">Đăng nhập</a>';
    } else {
        title.innerText = "Đăng Nhập";
        btn.innerText = "Đăng Nhập";
        toggleText.innerHTML = 'Chưa có tài khoản? <a href="#" onclick="toggleAuthMode()">Đăng ký ngay</a>';
    }
}

function handleAuth() {
    const usernameInput = document.getElementById("username-input").value.trim();
    const passwordInput = document.getElementById("password-input").value.trim();

    if (!usernameInput || !passwordInput) {
        alert("Vui lòng nhập đầy đủ Tên tài khoản và Mật khẩu!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("registeredUsers")) || {};

    if (isSignUpMode) {
        if (users[usernameInput]) {
            alert("Tên tài khoản này đã tồn tại! Vui lòng chọn tên khác.");
            return;
        }
        users[usernameInput] = passwordInput;
        localStorage.setItem("registeredUsers", JSON.stringify(users));
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        toggleAuthMode();
    } else {
        if (users[usernameInput] && users[usernameInput] === passwordInput) {
            localStorage.setItem("loggedInUser", usernameInput);
            showMainContent(usernameInput);
        } else {
            alert("Tên đăng nhập hoặc mật khẩu không đúng!");
        }
    }
}

function showMainContent(username) {
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    
    document.getElementById("user-display-name").innerText = username;
    const welcomeUser = document.getElementById("welcome-user-name");
    if (welcomeUser) welcomeUser.innerText = username;
}

function handleLogout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}