        const baseUrl = 'http://localhost:3000/email/send-message';

            document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault(); 
        
            createMessages();
        })
        let selectedFile;
        let imgePreview;
       
        async function createMessages() {
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const file = document.getElementById('attachment');
            
            
            if (!email || !subject || !message) {
                console.log('Form is invalid');
                return; 
            }

            const form= new FormData()
            form.append('email', email)
            form.append('subject', subject)
            form.append('message', message)
            form.append('file', file.files[0])
            console.log(selectedFile)


            // const contactData = {
            //     email: email,
            //     subject: subject,
            //     message: message,
            //     file: await file.files[0]
            // };
        
            try {
                const response = await fetch(baseUrl, {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: form
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

       function fileSelect(e){
        let img = document.querySelector('img')
            if(e.target.files[0]){
                selectedFile = e.target.files[0]
            }

            const reader = new FileReader()
            reader.readAsDataURL(selectedFile)


            reader.onload = (e)=>{
                imgePreview=  e.target.result
                img.src = imgePreview
                console.log(imgePreview)
            }
        }