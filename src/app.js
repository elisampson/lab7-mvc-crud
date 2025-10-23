import { ChatModel } from "./js/model.js";
import { ChatView } from "./js/view.js";
import { ChatController } from "./js/controller.js";

const model = new ChatModel();
const view = new ChatView(document.getElementById("chat-history"));
const controller = new ChatController(model, view);
