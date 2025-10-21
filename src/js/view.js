const chatWindow = document.getElementById("chatWindow");
const form = document.getElementById("chatForm");
const input = document.getElementById("messageBox");

function createMessageElement({ id, text, sender, timestamp, edited }) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${sender}`;
  wrapper.dataset.messageId = id;

  const content = document.createElement("p");
  content.textContent = text;

  const meta = document.createElement("time");
  meta.textContent = formatTime(timestamp);
  meta.dateTime = timestamp;

  if (edited) {
    const editedTag = document.createElement("span");
    editedTag.textContent = " (edited)";
    editedTag.style.fontSize = "0.75rem";
    editedTag.style.opacity = 0.7;
    content.appendChild(editedTag);
  }

  if (sender === "user") {
    const tools = document.createElement("div");
    tools.innerHTML = `
      <button data-edit>Edit</button>
      <button data-delete>Delete</button>
    `;
    wrapper.appendChild(tools);
  }

  wrapper.appendChild(content);
  wrapper.appendChild(meta);
  return wrapper;
}

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addMessage(message) {
  const el = createMessageElement(message);
  chatWindow.appendChild(el);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function renderAllMessages(messages) {
  clearMessages();
  messages.forEach(addMessage);
}

function clearMessages() {
  chatWindow.innerHTML = "";
}

function updateMessage(message) {
  const existing = chatWindow.querySelector(`[data-message-id="${message.id}"]`);
  if (!existing) return;

  const updated = createMessageElement(message);
  chatWindow.replaceChild(updated, existing);
}

function removeMessage(id) {
  const el = chatWindow.querySelector(`[data-message-id="${id}"]`);
  if (el) el.remove();
}

export {
  renderAllMessages,
  addMessage,
  updateMessage,
  removeMessage,
  clearMessages
};
