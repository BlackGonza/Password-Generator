function evaluatePasswordStrength(password) {
    const length = password.length;
    if (length < 6) {
        return "Очень слабый";
    } else if (length < 10) {
        return "Слабый";
    } else if (/\d/.test(password) && /[a-zA-Z]/.test(password)) {
        return "Средний";
    } else {
        return "Сильный";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const lengthField = document.getElementById("length");
    const passwordField = document.getElementById("password");
    const generateButton = document.getElementById("generate");
    const strengthField = document.getElementById("strength");

    generateButton.addEventListener("click", function () {
        const length = parseInt(lengthField.value);
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
        let password = "";

        if (isNaN(length) || length < 1) {
            alert("Пожалуйста, введите действительную длину пароля.");
            return;
        }

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset.charAt(randomIndex);
        }

        passwordField.value = password;

        const strength = evaluatePasswordStrength(password);
        strengthField.innerText = `Сложность пароля: ${strength}`;

        // Добавляем класс в зависимости от сложности
        if (strength === "Сильный") {
            strengthField.classList.remove("weak", "medium");
            strengthField.classList.add("strong");
        } else if (strength === "Средний") {
            strengthField.classList.remove("weak", "strong");
            strengthField.classList.add("medium");
        } else if (strength === "Слабый" || strength === "Очень слабый") {
            strengthField.classList.remove("medium", "strong");
            strengthField.classList.add("weak");
        }
    });
});
