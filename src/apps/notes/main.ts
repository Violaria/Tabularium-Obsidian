import { mount } from "svelte";
import App from "./App.svelte";
import "./notes.css";

mount(App, { target: document.getElementById("app") });

// Offline use: the service worker keeps the page and its bundle cached.
if ("serviceWorker" in navigator) void navigator.serviceWorker.register("/notes/sw.js", { scope: "/notes/" });
