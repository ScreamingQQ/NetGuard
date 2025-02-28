document.getElementById('protectionToggle').addEventListener('change', function() {
    if (this.checked) {
        console.log('Protection enabled.');
    } else {
        console.log('Protection disabled.');
    }
});

document.getElementById('adsToggle').addEventListener('change', function() {
    if (this.checked) {
        console.log('Ads blocking enabled.');
    } else {
        console.log('Ads blocking disabled.');
    }
});

document.getElementById('trackersToggle').addEventListener('change', function() {
    if (this.checked) {
        console.log('Trackers blocking enabled.');
    } else {
        console.log('Trackers blocking disabled.');
    }
});