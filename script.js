let value=null;
function getdata()
{
    let data=localStorage.getItem('Tasks');
    return data? JSON.parse(data):[];
}

function setdata(data)
{
    localStorage.setItem('Tasks',JSON.stringify(data));
}

function showdata()
{
    let data=getdata();
    let tbody=document.getElementById('dataTable').querySelector('tbody');
    tbody.innerHTML='';
    data.forEach((item,index)=>
        {
            let tablerow=document.createElement('tr');
            tablerow.innerHTML=`
            <td><input type="checkbox"></td>
            <td>${item.name}</td>
            <td>${item.details}</td>
            <td><button class="edit-btn" onclick="editdata(${index})">✏️</button></td>
            <td><button class="delete-btn" onclick="deleteData(${index})">🗑️</button></td>`
            tbody.appendChild(tablerow);
        }
       
    )
    

}


function editdata(index)
{
    let data=getdata();
    document.getElementById("modal").style.display="block";
    document.getElementById("dataTable").style.display="none";
    document.getElementById("btn").style.display="none";
    value=index;
}
function deleteData(index)
{
    let data=getdata();
    data.splice(index,1);
    setdata(data);
    showdata();
}
document.getElementById("forms").addEventListener("submit",(e)=>{
    if(value==null)
    {
    e.preventDefault();
    let data=getdata();
    let name=document.getElementById("task_name").value;
    let details=document.getElementById("task_details").value;
    data.push({name:name,
        details:details});
    setdata(data);
    document.getElementById("forms").reset();
    document.getElementById("modal").style.display="none";
    document.getElementById("dataTable").style.display="block";
    document.getElementById("btn").style.display="block";
    showdata();
    }
    else{
    e.preventDefault();
    let data=getdata();
    let name=document.getElementById("task_name").value;
    let details=document.getElementById("task_details").value;
    data[value] = {
        name: name,
        details: details
    };
    setdata(data);
    document.getElementById("forms").reset();
    document.getElementById("modal").style.display="none";
    document.getElementById("dataTable").style.display="block";
    document.getElementById("btn").style.display="block";
    showdata();
    }
})

document.getElementById("btn").addEventListener("click",(e)=>{
    document.getElementById("modal").style.display="block";
    document.getElementById("dataTable").style.display="none";
    document.getElementById("btn").style.display="none";
})