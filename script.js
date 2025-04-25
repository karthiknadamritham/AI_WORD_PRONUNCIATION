const trialCount = parseInt(localStorage.getItem('trialCount') || '0');
const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

// Enforce word limit for non-logged-in users
function enforceWordLimit(input) {
    return input.trim().split(/\s+/).length > 2;
}

// Load history from sessionStorage
function loadHistory() {
    if (!isLoggedIn) return;
    const history = JSON.parse(sessionStorage.getItem('history') || '[]');
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach(addHistoryItem);
}

// Add a word to the history list
function addHistoryItem(word) {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.textContent = word;
    div.onclick = async () => {
        document.getElementById('userInput').value = word;
        await fetchAndDisplayWord(word);
    };
    document.getElementById('historyList').appendChild(div);
}

// Fetch and display word pronunciation
async function fetchAndDisplayWord(word) {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = '';
    addMessage(word, 'user');

    try {
        const response = await fetch('http://localhost:5000/pronounce', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ word, language: "hindi" })
        });

        const data = await response.json();
        if (data.error) {
            addMessage(data.error, 'bot');
        } else {
            let message = `${word}`;
            if (data.pronunciation) message += `: ${data.pronunciation}`;
            addMessage(message, 'bot');

            if (data.audio) {
                const audioPlayer = document.getElementById('audioPlayer');
                audioPlayer.src = data.audio;
                audioPlayer.hidden = false;
                addMessage('[Click to play pronunciation]', 'bot-audio');
            }
        }
    } catch (error) {
        addMessage(error.message, 'bot-error');
    }
}

// Save a word to history
function saveToHistory(word) {
    if (!isLoggedIn) return;
    const history = JSON.parse(sessionStorage.getItem('history') || '[]');
    if (!history.includes(word)) {
        history.unshift(word);
        sessionStorage.setItem('history', JSON.stringify(history));
        addHistoryItem(word);
    }
}

// Clear chat history
function clearHistory() {
    if (isLoggedIn) {
        const chatBox = document.getElementById('chatBox');
        const messages = chatBox.querySelectorAll('.user-message');
        const history = JSON.parse(sessionStorage.getItem('history') || '[]');

        messages.forEach(message => {
            const word = message.textContent.trim();
            if (word && !history.includes(word)) {
                history.push(word);
            }
        });

        sessionStorage.setItem('history', JSON.stringify(history));
        loadHistory();
    }

    document.getElementById('chatBox').innerHTML = '';
}

// Get pronunciation for a word
async function getPronunciation(word, language = 'hindi') {
    try {
        const response = await fetch('http://localhost:5000/pronounce', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ word, language })
        });

        const data = await response.json();
        if (data.error) {
            addMessage(`Error: ${data.error}`, 'bot-error');
        } else {
            let message = `${word}`;
            if (data.pronunciation && data.pronunciation !== "Generated") {
                message += `: ${data.pronunciation}`;
            }
            addMessage(message, 'bot');
            addMessage('[Click to play pronunciation]', 'bot-audio');

            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = data.audio;
            audioPlayer.hidden = false;

            saveToHistory(word);
        }
    } catch (err) {
        addMessage("Network error - please check your connection", 'bot-error');
    }
}

// Handle send button click
document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value.trim();

    if (!isLoggedIn && enforceWordLimit(userInput)) {
        alert("Please login to search longer phrases");
        window.location.href = "login.html";
        return;
    }

    if (!userInput) {
        addMessage("Please enter a word", 'bot');
        return;
    }

    const language = document.getElementById('languageSelect').value;
    await getPronunciation(userInput, language);
});

// Show suggestions for user input
document.getElementById('userInput').addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    if (!query) return;

    try {
        const res = await fetch(`https://api.datamuse.com/sug?s=${query}`);
        const suggestions = await res.json();
        showSuggestions(suggestions.map(s => s.word));
    } catch (err) {
        console.error('Suggestion error:', err);
    }
});

// Display suggestions
function showSuggestions(words) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    words.slice(0, 5).forEach(word => {
        const suggestion = document.createElement('div');
        suggestion.textContent = word;
        suggestion.onclick = () => {
            document.getElementById('userInput').value = word;
            suggestionsDiv.innerHTML = '';
        };
        suggestionsDiv.appendChild(suggestion);
    });
}

// Add a message to the chat
function addMessage(text, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    const timeDiv = document.createElement('div');

    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;

    timeDiv.className = 'message-time';
    timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    messageDiv.appendChild(timeDiv);
    chatBox.appendChild(messageDiv);

    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
}

// Event listeners
window.addEventListener('load', loadHistory);
document.getElementById('clearHistory').addEventListener('click', clearHistory);
document.getElementById('audioPlayer').addEventListener('ended', () => {
    document.getElementById('audioPlayer').hidden = true;
});
document.getElementById('loginButton').addEventListener('click', () => {
    window.location.href = 'login.html';
});