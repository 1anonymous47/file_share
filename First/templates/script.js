function uploader(e)
{
    
    e.preventDefault();
    const data = new FormData();
    const file = document.getElementById('file').files[0];
    data.append('file',file);
    fetch("http://localhost:3000/upload",
        {
            method:'POST',
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.message)
            {
                document.getElementById('status').innerHTML=data.message;
                let a = document.getElementById('link')
                a.innerText=data.url;
                a.href = data.url;
            }
            else
            {
                alert("No Response");
            }
        })
        file.value=null;
        
}
