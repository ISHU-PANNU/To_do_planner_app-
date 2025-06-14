document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });
  

  <script>
  const quotes = [
    "Believe in yourself and all that you are.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Discipline is the bridge between goals and accomplishment.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Push yourself, because no one else is going to do it for you.",
    "Start where you are. Use what you have. Do what you can.",
    "Consistency is what transforms average into excellence."
  ];

  
</script>

  