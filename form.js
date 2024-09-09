        const baseUrl = 'https://student-management-api-beta.vercel.app/email/send-message';

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
                showToast('Message sent successfully!');
            } catch (error) {
                console.error('Error sending message', error);
                showToast('Error sending message');
            }
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = "toast show";
            
            setTimeout(function() {
                toast.className = toast.className.replace("show", "");
            }, 3000); 
        }
        