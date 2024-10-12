const socket = io();

let user = null;

if (!user) {
  Swal.fire({
    title: "Welcome to our Chat",
    input: "email",
    inputLabel: "Your email address",
    inputPlaceholder: "Enter your email address",
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((input) => {
    user = input.value;
    socket.emit("newUser", user);
  });
}

const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    user,
    message: message.value,
  });
  message.value = "";
});

message.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    socket.emit("chat:message", {
      user,
      message: message.value,
    });
    message.value = "";
  }
});

socket.on("messages", (data) => {
  actions.innerHTML = "";
  const chatRender = data
    .map((msg) => {
      return `<p><strong>${msg.user}</strong>: ${msg.message}</p>`;
    })
    .join(" ");

  output.innerHTML = chatRender;
});

socket.on("newUser", (user) => {
  Toastify({
    text: `${user} is logged in`,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {},
  }).showToast();
});

message.addEventListener("keypress", () => {
  socket.emit("chat:typing", user);
});

socket.on("chat:typing", (data) => {
  actions.innerHTML = `<p>${data} is writing a message...</p>`;
  const myTimeout = setTimeout(() => {
    actions.innerHTML = "";
  }, 5000);
});
