import * as Model from "./model.js";
import {
  renderAllMessages,
  addMessage,
  updateMessage,
  removeMessage,
  clearMessages
} from "./view.js";

const form = document.querySelector("#chat-form");
const input = document.querySelector("#user-input");

Model.loadMessages();
renderAllMessages(Model.getMessages());

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const userMsg = Model.createMessage(text, true);
  addMessage(userMsg);
  input.value = "";

  const botText = getBotResponse(text);
  const botMsg = Model.createMessage(botText, false);
  addMessage(botMsg);
});

document.querySelector("#chat-history").addEventListener("click", (e) => {
  const msgEl = e.target.closest(".message");
  if (!msgEl) return;

  const id = msgEl.dataset.id;

  if (e.target.classList.contains("edit")) {
    const newText = prompt("Edit your message:", Model.getMessage(id)?.text);
    if (newText !== null) {
      const updated = Model.updateMessage(id, newText);
      updateMessage(updated);
    }
  }

  if (e.target.classList.contains("delete")) {
    const confirmDelete = confirm("Delete this message?");
    if (confirmDelete) {
      Model.deleteMessage(id);
      removeMessage(id);
    }
  }
});

document.querySelector("#export-btn")?.addEventListener("click", () => {
  const data = Model.exportMessages();
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "chat-history.json";
  a.click();
  URL.revokeObjectURL(url);
});

document.querySelector("#import-btn")?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      Model.importMessages(reader.result);
      renderAllMessages(Model.getMessages());
    } catch (err) {
      alert("Invalid file format.");
    }
  };
  reader.readAsText(file);
});

document.querySelector("#clear-btn")?.addEventListener("click", () => {
  if (confirm("Clear all messages?")) {
    Model.clearAll();
    clearMessages();
  }
});
