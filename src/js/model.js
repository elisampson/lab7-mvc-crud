const STORAGE_KEY = "chat-history";
let messages = [];

// --- Load messages from localStorage ---
function loadMessages() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    messages = stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load chat history:", e);
    messages = [];
  }
}

// --- Save messages to localStorage ---
function saveMessages() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

// --- Notify the view that data changed ---
function emitUpdate() {
  document.dispatchEvent(new CustomEvent("messagesUpdated", {
    detail: { messages: [...messages] }
  }));
}

// --- Add new message ---
export function addMessage(text, sender) {
  const message = {
    id: Date.now().toString(),
    text,
    sender, 
    timestamp: new Date().toISOString(),
    edited: false
  };
  messages.push(message);
  saveMessages();
  emitUpdate();
}

// --- Get all messages ---
export function getMessages() {
  return [...messages]; 
}

// --- Edit message by ID ---
export function updateMessage(id, newText) {
  const msg = messages.find((m) => m.id === id);
  if (msg && msg.sender === "user") {
    msg.text = newText;
    msg.edited = true;
    saveMessages();
    emitUpdate();
  }
}

// --- Remove message ---
export function deleteMessage(id) {
  messages = messages.filter((m) => m.id !== id);
  saveMessages();
  emitUpdate();
}

// --- Clear all messages ---
export function clearMessages() {
  messages = [];
  saveMessages();
  emitUpdate();
}

// --- Export and import support ---
export function exportMessages() {
  return JSON.stringify(messages, null, 2);
}

export function importMessages(json) {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      messages = parsed;
      saveMessages();
      emitUpdate();
    }
  } catch (e) {
    console.error("Import failed:", e);
  }
}

// --- Initialize model ---
loadMessages();
emitUpdate();
