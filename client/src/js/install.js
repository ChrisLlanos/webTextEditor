const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();

    const deferredPrompt = event;

    butInstall.style.display = 'block';

    butInstall.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();

            const choiceResult = await deferredPrompt.userChoice;

            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }

            deferredPrompt = null;
        }
    });
});


window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed');
});
