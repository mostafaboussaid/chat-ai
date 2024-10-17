const pauseMusic = document.getElementById('pmusic');
const myAudio = document.getElementById('audio');
const textButton = document.querySelector('.pause-play');

pauseMusic.addEventListener('click', function TogglePause() {
    if (myAudio.paused) {
        myAudio.play();
        textButton.classList.add('fa-pause');
        textButton.classList.remove('fa-play');
    } else {
        myAudio.pause();
        textButton.classList.remove('fa-pause');
        textButton.classList.add('fa-play');
    }
});


const chatSend = document.getElementById('input-send');
const chatPlace = document.querySelector('.chat-box');
const chatArea = document.querySelector('.chat-area');
const chatInput = document.getElementById('input-text');
const chatInputHeight = chatInput.scrollHeight;
const chatAreaHeight = chatArea.scrollHeight;
chatInput.oninput = () => {
    chatInput.style.height = `${chatInputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
    chatInput.scrollTop = chatInputHeight;

};
chatInput.addEventListener('keypress', function(e) {
    if (e.key === "Enter") {
    e.preventDefault();
    activateBot();
    }
});
let userMessage = null;
chatSend.addEventListener('click', activateBot);
function activateBot() {
    if (chatInput.value.length == "0"){
        
    } else {
    const chatInput = document.getElementById('input-text');
    const chatInputValue = chatInput.value;
    const genMsg = document.createElement('li');
    const genTxt = document.createElement('p');
    userMessage = chatInputValue;
    genMsg.classList.add('human-msg');
    genMsg.appendChild(genTxt);
    genTxt.textContent = chatInputValue;
    chatPlace.appendChild(genMsg);
    chatInput.value = "";
    chatInput.style.height = "55px";
    generateResponse();
    }
}
const API_KEY = "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"; 
const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }
    const thiMsgA = document.createElement('li');
    const thiTxtA = document.createElement('p');
    const thiaiLogo = document.createElement('span');
    thiaiLogo.classList.add('fa-solid');
    thiaiLogo.classList.add('fa-microchip');
    thiMsgA.appendChild(thiaiLogo);
    thiMsgA.classList.add('ai-msg');
    thiMsgA.appendChild(thiTxtA);
    thiTxtA.textContent = 'Chat AI is processing your text...';
    chatPlace.appendChild(thiMsgA);
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        const genMsgA = document.createElement('li');
        const genTxtA = document.createElement('p');
        const aiLogo = document.createElement('span');
        aiLogo.classList.add('fa-solid');
        aiLogo.classList.add('fa-microchip');
        genMsgA.appendChild(aiLogo);
        genMsgA.classList.add('ai-msg');
        genMsgA.appendChild(genTxtA);
        genTxtA.textContent = data.choices[0].message.content.trim();
        chatPlace.appendChild(genMsgA);
        if (genTxtA.textContent != ""){
            thiMsgA.remove();
        } 
    }).catch(() => {
        const genMsgA = document.createElement('li');
        const genTxtA = document.createElement('p');
        const aiLogo = document.createElement('span');
        aiLogo.classList.add('fa-solid');
        aiLogo.classList.add('fa-microchip');
        genMsgA.appendChild(aiLogo);
        genMsgA.classList.add('ai-msg');
        genMsgA.appendChild(genTxtA);
        genTxtA.textContent = "Sorry there's a problem with our servers right now. Come back later.";
        chatPlace.appendChild(genMsgA);
        if (genTxtA.textContent != ""){
            thiMsgA.remove();
        } 
    })
}