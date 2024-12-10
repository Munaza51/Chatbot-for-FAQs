const faqData = [
  { question: "What is the return policy?", answer: "You can return items within 30 days." },
  { question: "Do you offer international shipping?", answer: "Yes, we ship to select countries." },
  { question: "What payment methods do you accept?", answer: "We accept credit cards, PayPal, and more." }
];

document.getElementById("sendBtn").addEventListener("click", handleUserInput);

function handleUserInput() {
  const userInput = document.getElementById("userInput").value.trim();
  if (userInput) {
    addMessage("user", userInput);
    document.getElementById("userInput").value = "";
    setTimeout(() => {
      showTypingIndicator();
      setTimeout(() => {
        hideTypingIndicator();
        const response = getFAQResponse(userInput.toLowerCase());
        addMessage("bot", response);
      }, 1000);
    }, 300);
  }
}

function addMessage(sender, text) {
  const chatBox = document.getElementById("chatBox");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
  addMessage("bot", "...");
}

function hideTypingIndicator() {
  const chatBox = document.getElementById("chatBox");
  const messages = chatBox.getElementsByClassName("bot");
  if (messages[messages.length - 1].textContent === "...") {
    chatBox.removeChild(messages[messages.length - 1]);
  }
}

function getFAQResponse(userQuery) {
  for (let faq of faqData) {
    if (userQuery.includes(faq.question.toLowerCase())) {
      return faq.answer;
    }
  }
  return "Sorry, I couldn't find an answer to that. Try asking something else!";
}
