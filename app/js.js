let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let noTasksMessage = document.querySelector(".no-tasks-message");
let data=[];
// focus on input
window.onload=()=>{
    theInput.focus();
    checkData();
    calculateTask();
    const localData=JSON.parse(localStorage.getItem("data"));
    if(localData.length >0)
    {
    localData.forEach(item=>{
        data.push(item);
    });
    noTasksMessage.style.display="none";
    JSON.parse(localStorage.getItem("data")).forEach(item => {
        docs(item.name, item.id);
    });
} 
}

// function add task
theAddButton.addEventListener("click",addTask);
function addTask()
{
    if(theInput.value==="")
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'please enter text',
          })
          return;
    }
    
        if(JSON.parse(localStorage.getItem("data")) > null)
        {
            let x=true;
            const taskBoxs=document.querySelectorAll(".tasks-content .task-box");
            data.forEach(item=>{
                if(item.name == theInput.value)
                {
                    x=false;
                }
            });
           if(x==true)
           {
               noTasksMessage.style.display = "none";

               //set id and name to array and localStorage    
               const lastId = data[data.length - 1].id
               data.push({ name: theInput.value, id: lastId + 1 });
               localStorage.setItem("data", JSON.stringify(data));

               // insert element in html
               docs(data[data.length - 1].name, data[data.length - 1].id);
               theInput.value = "";
               checkData();
               calculateTask();
               return;
           }
           else
           {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'text is exist',
              });
              theInput.value="";
           }
            
        }
        else
        {
            noTasksMessage.style.display = "none";

            //set id and name to array and localStorage 
            const lastId = 0
            data.push({ name: theInput.value, id: lastId });
            localStorage.setItem("data", JSON.stringify(data));

            // insert element in html
            docs(data[data.length - 1].name, data[data.length - 1].id);
            theInput.value = "";
            theInput.focus();
            checkData();
            calculateTask();
        }
    }
// function delete
document.addEventListener("click",(e)=>{
    // if delete
    if(e.target.className=="delete")
    {
        const id=e.target.previousElementSibling.id;
        const index=data.map(item=>{
            return item.id;
        }).indexOf(parseInt(id));
        data.splice(index,1);
        localStorage.setItem("data",JSON.stringify(data));
        e.target.parentElement.remove();
        checkData();
        calculateTask();
        if(JSON.parse(localStorage.getItem("data")).length==0)
        {
            noTasksMessage.style.display="block";
        }
    }
    // if completed
    if(e.target.classList.contains("task-box"))
    {
        e.target.classList.toggle("finished");
        calculateCompleted();
    }
    if(JSON.parse(localStorage.getItem("data")).length > 0)
    {
        noTasksMessage.style.display="none";
    }
    theInput.focus();
});

// function deleteAll
const deleteAllBtn=document.querySelector(".task-btns .deleteAll");
deleteAllBtn.addEventListener("click",deleteAll);
function deleteAll()
{
    data.splice(0,data.length);
    localStorage.setItem("data",JSON.stringify(data));
            const taskBoxs=document.querySelectorAll(".tasks-content .task-box");
            taskBoxs.forEach(item=>{
                item.remove();
            });
     noTasksMessage.style.display="block";
       checkData();
       calculateTask();
};
// function finishAll
const finishAllBtn=document.querySelector(".task-btns .finish");
finishAllBtn.addEventListener("click",finishAll);
function finishAll()
{
            const taskBoxs=document.querySelectorAll(".tasks-content .task-box");
            taskBoxs.forEach(item=>{
                item.classList.toggle("finished");
            });
calculateCompleted();
};
// function checkData
const taskBtns=document.querySelector(".task-btns");
function checkData()
{
    if(JSON.parse(localStorage.getItem("data")).length >0)
    {
        taskBtns.style.display="block";
    }
    else
    {
        taskBtns.style.display="none";
    }
}
// function calculateTask
let tasksCount = document.querySelector(".tasks-count span");
function calculateTask()
{
    let count=JSON.parse(localStorage.getItem("data")).length;
    tasksCount.innerHTML=count;
}
// function calculateCompleted
let tasksCompleted = document.querySelector(".tasks-completed span");
function calculateCompleted()
{
    let count=document.querySelectorAll(".tasks-content .finished").length;
    tasksCompleted.innerHTML=count;
}
// function docs
function docs(name,id)
{
    const span=document.createElement("span");
    span.className="task-box";

    const text=document.createElement("span");
    text.className="text"
    text.setAttribute("id",id);
    text.innerHTML=name;
    
    const smallSpan=document.createElement("span");
    smallSpan.className="delete";
    smallSpan.textContent="delete"

    span.appendChild(text);
    span.appendChild(smallSpan);
    tasksContainer.appendChild(span);
}



