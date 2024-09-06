   const baseUrl = 'http://localhost:5000/email/send-message';

            document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault(); 
        
            createMessages();
        })
        
        async function createMessages() {
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            
            if (!email || !subject || !message) {
                console.log('Form is invalid');
                return; 
            }
        
            const contactData = {
                email: email,
                subject: subject,
                message: message
            };
        
            try {
                const response = await fetch(baseUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contactData)
                });
        
                const data = await response.json();
                console.log('Message sent successfully', data);
        
                
                document.getElementById('contactForm').reset();
            } catch (error) {
                console.error('Error sending message', error);
            }
        }
        