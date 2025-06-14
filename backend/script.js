 function showLoader() {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<span class="loader"></span>Scanning...';
            resultDiv.className = 'result';
            resultDiv.style.opacity = 1;
            resultDiv.style.transform = 'translateY(0)';
        }

        function showResult(text, type) {
            const resultDiv = document.getElementById('result');
            resultDiv.textContent = text;
            resultDiv.className = 'result ' + type;
            resultDiv.style.opacity = 1;
            resultDiv.style.transform = 'translateY(0)';
        }

        async function scanMessage() {
            const message = document.getElementById('messageInput').value.trim();
            const resultDiv = document.getElementById('result');
            const scanBtn = document.getElementById('scanBtn');

            if (!message) {
                showResult('Please enter a message to scan.', '');
                return;
            }

            scanBtn.disabled = true;
            scanBtn.style.opacity = 0.7;
            showLoader();

            try {
                const response = await fetch('http://127.0.0.1:5000/detect', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: message })
                });

                if (!response.ok) throw new Error('Server error');

                const data = await response.json();

                if (data.is_scam) {
                    showResult('⚠️ Scam Message Detected!', 'scam');
                } else {
                    showResult('✅ Message appears safe.', 'safe');
                }
            } catch (err) {
                // fallback in case Flask server is not running
                const scamKeywords = ["win", "free", "₹", "prize", "urgent", "click here", "congratulations", "lottery", "claim", "reward"];
                const lowerMsg = message.toLowerCase();
                const isScam = scamKeywords.some(keyword => lowerMsg.includes(keyword));
                if (isScam) {
                    showResult('⚠️ Scam Message Detected! (Offline Mode)', 'scam');
                } else {
                    showResult('✅ Message appears safe. (Offline Mode)', 'safe');
                }
            }

            scanBtn.disabled = false;
            scanBtn.style.opacity = 1;
        }