const quotesAPI = "https://script.google.com/macros/s/AKfycbxa6Hc7Pd7YQb_dadcdGgAojFlafPh-5ooxkegoKHCRlSbye0eN8SzcU2HzIGn6FiNO/exec"; // 👈 Replace this!

let userName = "";

function sendMessage() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (text === "") return;

  appendMessage(text, "user");
  input.value = "";
  document.getElementById("send-sound").play();

  setTimeout(() => {
    appendTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const lower = text.toLowerCase();

      if (lower.startsWith("hello, i'm ") || lower.startsWith("hello im ")) {
        userName = text.split(" ").slice(2).join(" ");
        const greet = `Hi ${userName}, here's a message to motivate you today:\n`;
        appendMessage(greet, "bot");

        getRandomQuote(quote => {
          appendMessage(`<strong>${quote}</strong>\n\nType <strong>More</strong> for another inspiring message.`, "bot");
          document.getElementById("bot-sound").play();
        });

      } else if (lower === "more") {
        const msg = `Sure! Here's another one:\n`;
        appendMessage(msg, "bot");

        getRandomQuote(quote => {
          appendMessage(`<strong>${quote}</strong>\n\nType <strong>More</strong> if you'd like another.`, "bot");
          document.getElementById("bot-sound").play();
        });

      } else {
        appendMessage(`Hi there! To get started, type <strong>"Hello, I'm &lt;your name&gt;"</strong> 😊`, "bot");
        document.getElementById("bot-sound").play();
      }
    }, 1500);
  }, 400);
}

function getRandomQuote(callback) {
  fetch(quotesAPI)
    .then(response => response.text())
    .then(quote => callback(quote))
    .catch(() => callback("Sorry, I couldn't fetch a quote right now."));
}

function appendMessage(text, sender) {
  const messages = document.getElementById("messages");
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.innerHTML = text.replace(/\n/g, "<br>");
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function appendTypingIndicator() {
  const messages = document.getElementById("messages");
  const typing = document.createElement("div");
  typing.id = "typing-indicator";
  typing.className = "message bot";
  typing.innerHTML = "NBS is typing...";
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById("typing-indicator");
  if (typing) typing.remove();
}

// Auto welcome message
window.onload = () => {
  setTimeout(() => {
    appendMessage(`👋 Hi! I'm <strong>NBS EduConnect</strong>.<br>Feeling like you need a boost?<br>Just type <strong>"Hello, I'm &lt;your name&gt;"</strong> and receive an inspiring message made for you today!`, "bot");
    document.getElementById("bot-sound").play();
  }, 400);
};

// Allow pressing Enter to send
document.getElementById("input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
