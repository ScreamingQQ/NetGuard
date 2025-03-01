(function() {
    const sidebarHTML = `
    <div id="netguardSidebar" class="netguard-sidebar">
        <div class="header">
            <button class="settings-button" id="settingsButton">
                <img src="${chrome.runtime.getURL('icons/ic_settings.svg')}" alt="Settings">
            </button>
            <button class="close-button" id="closeButton">
                <img src="${chrome.runtime.getURL('icons/x-icon.svg')}" alt="Close">
            </button>
        </div>
        <h1 class="netguard-header">NetGuard</h1>
        <p class="netguard-text">Stay safe on the internet with NetGuard.</p>
        <div class="options-container">
            <div class="option-container">
                <label class="toggle-switch">
                    <input type="checkbox" id="protectionToggle">
                    <span class="slider"></span>
                </label>
                <span class="netguard-text">Enable Protection</span>
            </div>
            <div class="option-container">
                <label class="toggle-switch">
                    <input type="checkbox" id="adsToggle">
                    <span class="slider"></span>
                </label>
                <span class="netguard-text">Block Ads</span>
            </div>
            <div class="option-container">
                <label class="toggle-switch">
                    <input type="checkbox" id="trackersToggle">
                    <span class="slider"></span>
                </label>
                <span class="netguard-text">Block Trackers</span>
            </div>
            <div class="option-container">
                <label class="toggle-switch">
                    <input type="checkbox" id="darkModeToggle">
                    <span class="slider"></span>
                </label>
                <span class="netguard-text">Dark Mode</span>
            </div>
        </div>
        <div class="version-container">
            <span class="netguard-text">Version: 1.0.0</span>
        </div>
    </div>
    `;

    const sidebarStyle = `
    <style>
        @font-face {
            font-family: 'M PLUS Rounded 1c';
            src: url('${chrome.runtime.getURL('fonts/MPLUSRounded1c-Regular.ttf')}') format('truetype');
        }
        .netguard-sidebar {
            position: fixed;
            top: 0;
            right: -400px; /* Adjusted width */
            width: 400px; /* Adjusted width */
            height: 100%;
            background-color: #ffffff;
            box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
            transition: right 0.5s ease-in-out, opacity 0.5s ease-in-out;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            z-index: 10000;
            border-radius: 10px 0 0 10px;
            opacity: 0;
            font-family: 'M PLUS Rounded 1c', sans-serif;
        }
        .netguard-sidebar.show {
            right: 0;
            opacity: 1;
        }
        .header {
            display: flex;
            justify-content: flex-end;
            width: 100%;
        }
        .close-button, .settings-button {
            background: none;
            border: none;
            cursor: pointer;
            margin-left: 10px;
        }
        .close-button img, .settings-button img {
            width: 24px;
            height: 24px;
        }
        .netguard-header {
            color: red;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .netguard-text {
            color: black;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .options-container {
            background-color: #f7f7f7; /* Adjusted brightness */
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }
        .option-container {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            width: 100%;
            justify-content: space-between;
        }
        .toggle-switch {
            position: relative;
            width: 40px;
            height: 20px;
        }
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 20px;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 14px;
            width: 14px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        input:checked + .slider {
            background-color: #d32f2f;
        }
        input:checked + .slider:before {
            transform: translateX(20px);
        }
        .dark-mode {
            background-color: #121212;
            color: #ffffff;
        }
        .dark-mode .netguard-sidebar {
            background-color: #333333;
            color: #ffffff;
        }
        .dark-mode .options-container {
            background-color: #444444;
            border-color: #555555;
        }
        .dark-mode .netguard-text {
            color: #ffffff;
        }
        .version-container {
            margin-top: auto;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            width: 100%;
            text-align: center;
        }
    </style>
    `;

    if (!document.getElementById('netguardSidebar')) {
        document.body.insertAdjacentHTML('beforeend', sidebarHTML);
        document.head.insertAdjacentHTML('beforeend', sidebarStyle);
    }

    const sidebar = document.getElementById('netguardSidebar');
    const closeButton = document.getElementById('closeButton');
    const settingsButton = document.getElementById('settingsButton');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Close the sidebar when the close button is clicked
    closeButton.addEventListener('click', function() {
        sidebar.classList.remove('show');
    });

    // Toggle the sidebar when the extension icon is clicked
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === 'toggleSidebar') {
            sidebar.classList.toggle('show');
        }
    });

    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
})();