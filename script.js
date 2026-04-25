class ChatApp {
            constructor() {
                this.messagesContainer = document.getElementById('chatMessages');
                this.messageInput = document.getElementById('messageInput');
                this.sendBtn = document.getElementById('sendBtn');
                
                this.isTyping = false;
                this.typingTimeout = null;
                
                this.init();
            }
            
            init() {
                // Send message on Enter key
                this.messageInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });
                
                // Send button click
                this.sendBtn.addEventListener('click', () => {
                    this.sendMessage();
                });
                
                // Typing indicator
                this.messageInput.addEventListener('input', () => {
                    this.handleTyping();
                });
                
                // Auto-scroll to bottom
                this.scrollToBottom();
            }
            
            handleTyping() {
                if (this.messageInput.value.trim()) {
                    if (!this.isTyping) {
                        this.showTypingIndicator();
                    }
                    clearTimeout(this.typingTimeout);
                    this.typingTimeout = setTimeout(() => {
                        this.hideTypingIndicator();
                    }, 1000);
                } else {
                    this.hideTypingIndicator();
                }
            }
            
            showTypingIndicator() {
                if (!this.isTyping) {
                    const typingIndicator = document.createElement('div');
                    typingIndicator.className = 'typing-indicator received';
                    typingIndicator.innerHTML = `
                        <div class="message-avatar">👤</div>
                        <div>
                            <div style="font-size: 14px; opacity: 0.7;">Someone is typing</div>
                            <div class="typing-dots">
                                <div class="typing-dot"></div>
                                <div class="typing-dot"></div>
                                <div class="typing-dot"></div>
                            </div>
                        </div>
                    `;
                    this.messagesContainer.appendChild(typingIndicator);
                    this.scrollToBottom();
                    this.isTyping = true;
                }
            }
            
            hideTypingIndicator() {
                const typingIndicator = this.messagesContainer.querySelector('.typing-indicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
                this.isTyping = false;
            }
            
            sendMessage() {
                const message = this.messageInput.value.trim();
                if (!message) return;
                
                // Hide typing indicator
                this.hideTypingIndicator();
                
                // Add sent message
                this.addMessage(message, 'sent');
                
                // Simulate response
                setTimeout(() => {
                    const responses = [
                        "That's interesting! 😊",
                        "I see what you mean 👍",
                        "Great point! 👏",
                        "Tell me more... 🤔",
                        "Awesome! 🔥",
                        "Thanks for sharing! 🙌",
                        "Very cool! ✨"
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    this.addMessage(randomResponse, 'received');
                }, 800 + Math.random() * 1200);
                
                // Clear input
                this.messageInput.value = '';
                this.sendBtn.disabled = true;
            }
            
            addMessage(text, type) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${type}`;
                
                const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                
                let avatar = type === 'sent' ? '👤' : '🤖';
                
                messageDiv.innerHTML = `
                    <div class="message-avatar">${avatar}</div>
                    <div class="message-content">
                        <div>${text}</div>
                        <div class="message-time">${time}</div>
                    </div>
                `;
                
                this.messagesContainer.appendChild(messageDiv);
                this.scrollToBottom();
            }
            
            scrollToBottom() {
                this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            }
        }
        
        // Initialize chat app when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new ChatApp();
        });