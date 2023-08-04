document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    // Function to add a new message to the chat container
    function addMessage(user, content) {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.innerHTML = `
            <span class="user">${user}</span>
            <br> <!-- Add <br> element to start message from new line -->
            <span class="content">${content}</span>
            <span class="delete-button">Delete</span>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom

        // Event listener for the delete button
        const deleteButton = messageDiv.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            messageDiv.remove();
        });
    }

    // Function to handle sending messages
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            messageInput.value = "";

            const userMessage = document.createElement("div");
            userMessage.className = "message user-message"; // Apply the user-message class
            userMessage.innerHTML = `<span class="user">You: </span><span class="content"></span>`;
            chatMessages.appendChild(userMessage);
            const userMessageContent = userMessage.querySelector(".content");

            // Simulate streaming text effect for user's message
            let currentCharacter = 0;
            const typingInterval = setInterval(() => {
                if (currentCharacter < message.length) {
                    const nextCharacter = message.charAt(currentCharacter);
                    userMessageContent.textContent += nextCharacter;
                    currentCharacter++;
                } else {
                    clearInterval(typingInterval);

                    // Generate a random number of "Meon" responses between 5 and 10
                    const meonResponses = ["Puki"]; // Start with one "Meon"
                    const numResponses = Math.floor(Math.random() * 6) + 1; // Random number between 5 and 10
                    for (let i = 0; i < numResponses; i++) {
                        meonResponses.push("Puki");
                    }
                    const meonResponseString = meonResponses.join(" ");
                    // Adjust typing interval based on the length of ChatGPT's response
                    const typingIntervalGpt = 100 - Math.min(80, Math.floor(meonResponseString.length / 5));
                    setTimeout(() => {
                        // Show ChatGPT's response with streaming text effect
                        const chatGptMessage = document.createElement("div");
                        chatGptMessage.className = "message ai-message"; // Apply the ai-message class
                        chatGptMessage.innerHTML = `<span class="user">ChatGPT: </span><span class="content"></span>`;
                        chatMessages.appendChild(chatGptMessage);
                        const chatGptMessageContent = chatGptMessage.querySelector(".content");

                        let currentCharacterGpt = 0;
                        const typingIntervalChatGpt = setInterval(() => {
                            if (currentCharacterGpt < meonResponseString.length) {
                                const nextCharacterGpt = meonResponseString.charAt(currentCharacterGpt);
                                chatGptMessageContent.textContent += nextCharacterGpt;
                                currentCharacterGpt++;
                            } else {
                                clearInterval(typingIntervalChatGpt);
                            }
                        }, typingIntervalGpt); // Time interval between each character (adjust as needed)

                        // Auto-scroll to the bottom after ChatGPT's response is finished typing
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }, 800); // Add a slight delay before the responses appear (for a more natural effect)
                }
            }, 40); // Time interval between each character (adjust as needed)
        }
    }

    // Event listener for the send button
    sendButton.addEventListener("click", sendMessage);

    // Event listener for the enter key on the message input
    messageInput.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            sendMessage();
        }
    });

});
