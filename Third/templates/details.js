
function submitter(e)
{
    e.preventDefault();
    const response = document.getElementById('response');
    const temp = document.getElementById('text');
    const data = temp.value.trim();
    if(data.length !=8)
    {
        alert("Enter a coreect 8 digit code");
        return;
    }
    fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({message:data}),
    })
    .then(res => res.json())
    .then(data => { 
        response.innerHTML="";
        if(data.length==0)
        {
            console.log(data);
            const linker = document.createElement('a');
            linker.innerText="No Valid code found";
            response.appendChild(linker);
            response.appendChild(document.createElement('br'));
            return;
        }
        if (Array.isArray(data)) {
            data.forEach(item => {
                const  {url}  = item;
                const linker = document.createElement('a');
                linker.href=url;
                linker.innerText=url;
                linker.target="_black";


                response.appendChild(linker);
                response.appendChild(document.createElement('br'));
            });
        } else {
            alert("No valid data received.");
        }
    })
    
    
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while processing your request.");
    });
    

}