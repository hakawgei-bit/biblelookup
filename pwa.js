const installButton = document.getElementById("installButton");
const installHelp = document.getElementById("installHelp");
let installPrompt;

const isStandalone = window.matchMedia("(display-mode: standalone)").matches
  || window.navigator.standalone === true;

function getInstallInstructions() {
  const userAgent = navigator.userAgent;
  const isAppleMobile = /iPhone|iPad|iPod/.test(userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isAppleMobile) {
    return "Tap Share, then choose “Add to Home Screen.”";
  }
  if (/Android/i.test(userAgent)) {
    return "Open the browser menu (⋮), then choose “Install app” or “Add to Home screen.”";
  }
  if (/Safari/i.test(userAgent) && !/Chrome|Chromium|Edg|OPR/i.test(userAgent)) {
    return "In Safari on macOS Sonoma or later, choose File > Add to Dock.";
  }
  return "Open the browser menu and choose “Install app” or “Create shortcut.”";
}

if (!isStandalone) {
  installButton.hidden = false;
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) {
    installHelp.textContent = getInstallInstructions();
    installHelp.hidden = false;
    return;
  }

  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  installButton.hidden = true;
});

window.addEventListener("appinstalled", () => {
  installPrompt = null;
  installButton.hidden = true;
  installHelp.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  });
}
