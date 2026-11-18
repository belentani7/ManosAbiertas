document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    if(chatSend && chatInput && chatBox) {
        chatSend.addEventListener('click', () => {
            const query = chatInput.value.trim();
            if(!query) return;
            
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-msg';
            userMsg.innerHTML = '<strong>Tú:</strong> ' + query;
            chatBox.appendChild(userMsg);
            chatInput.value = '';
            chatBox.scrollTop = chatBox.scrollHeight;

            setTimeout(() => {
                const aiMsg = document.createElement('div');
                aiMsg.className = 'chat-msg';
                aiMsg.style.color = '#2563eb';
                aiMsg.innerHTML = '<strong>Tutor IA:</strong> Excelente pregunta sobre "' + query + '". Te sugiero revisar el Módulo 1 y practicar con los ejercicios abiertos provistos.';
                chatBox.appendChild(aiMsg);
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 600);
        });

        chatInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') chatSend.click();
        });
    }
});
