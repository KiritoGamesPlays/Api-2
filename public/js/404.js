if ("Notification" in window) {
    // Verifica se o navegador suporta a API de Notificações
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        // Cria a notificação
        new Notification("Jujuba Website", {
          body: "Página não encontrada, volte para a página inicial!",
          icon: "images/404.png"
        });
      }
    });
  }