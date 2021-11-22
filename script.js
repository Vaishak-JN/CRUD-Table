// using mockapi
const apiUrl="https://619b83b42782760017445647.mockapi.io/users";
const getData= async()=>{
    try{
        const resp=await fetch(apiUrl)
        const data=await resp.json();
        console.log(data)
        showTableData(data);
    }catch(error){
        console.log(error)
    }
}

const createUser= async()=>{
    try{
        const name=document.getElementById("name").value;
        const email=document.getElementById("email").value;
        const id=document.getElementById("hidden").value;
        if(id!==""){
            // same as {"name":name,"email":email}
            const resp=await fetch(apiUrl+`/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({name,email})
            })
            const result=await resp.json();
            alert("User Updated")
        }else{
            // same as {"name":name,"email":email}
            const resp=await fetch(apiUrl,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({name,email})
            })
            const result=await resp.json();
            alert("User Created")
            
        }
        document.querySelector("form").reset();
        getData()
        
    }catch(error){
        console.log(error)
    }
}

const showTableData=(data)=>{
    const tbody=document.getElementById("tbody");
    tbody.innerHTML="";
    data.forEach(ele=>{
        const tr=document.createElement("tr");
        const td1=document.createElement("td");
        td1.innerHTML=ele.id;
        const td2=document.createElement("td");
        td2.innerHTML=ele.name;
        const td3=document.createElement("td");
        td3.innerHTML=ele.email;
        const td4=document.createElement("td");
        td4.innerHTML=`<button type="button" class="btn btn-warning mx-1" onclick="getUserById(${ele.id})">Edit</button><button type="button" class="btn btn-danger mx-1" onclick="deleteUser(${ele.id})">Delete</button>`;
        tr.append(td1,td2,td3,td4);
        tbody.append(tr);
    })
}

const getUserById= async(id)=>{
    // console.log(id)
    try{
        const resp=await fetch(`${apiUrl}/${id}`);
        const data=await resp.json();
        document.getElementById("name").value=data.name;
        document.getElementById("email").value=data.email;
        document.getElementById("hidden").value=data.id;
    }catch(error){
        console.log(error)
    }
}

const deleteUser= async(id)=>{
    // console.log(id)
    try{
        await fetch(`${apiUrl}/${id}`,{
            method:"DELETE",
        });
        alert("User Deleted")
        getData();
    }catch(error){
        console.log(error)
    }
}

getData();

