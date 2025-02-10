function uploader(e)
{
    
    e.preventDefault();
    const data = new FormData();
    const passswordvalue = document.getElementById('password');
    const password = passswordvalue.value.trim();
    const fileinput = document.getElementById('file');
    const file = fileinput.files[0];
    const maxsize = 1024*1024*5;
    if(!password)
    {
        alert("Enter any password otherwise it wont upload");
        return ;

    }
    if(password.length!=8 || isNaN(password))
    {
        alert("Password must be 8digits long no longer or shorter than 8");
        return ;
    }
    if(!file)
    {
        alert("Please select a file to upload");
    }
    if(file.size>maxsize)
    {
        alert("File is too large use file leass than 5 MB");
        fileinput.value="";
        return;
    }

    data.append('file',file);
    data.append('password',password);
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
        .catch(error => {
            console.error("Upload error:", error);
            alert("Error during file upload.");
        });
        fileinput.value="";
        
}
