function saveTask(){
  console.log("Task Manager...")
  const title = $("#txtTitle").val();
  const description = $("#txtDescription").val();
  const color = $("#txtColor").val();
  const date = $("#txtDate").val();
  const status = $("#selStatus").val();
  const budget = $("#numBudget").val();

  console.log(title, description, color, date, status, budget)

  let taskSave = new Task(title, description, color, date, status, budget,)
  console.log(taskSave)

    // save to server
    $.ajax({
        type: "post",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskSave),
        contentType: "application/json",
        success: function (response) {
          console.log(response);
        },
        error: function (error) {
          console.log(error)
        }
      });
     displayTask(taskSave);
    }
      //display from server (get)
      function displayTask(task){
        let syntax = `
        <div class="task-container" style="border-color: ${task.color}">
        <div class="task">
            <div class="info">
                <h5>${task.title}</h5>
                <p>${task.description}</p>
            </div>
            <div class="status">${task.status}</div>
            <div class="date-budget">
                <span>${task.date}</span>
                <span>${task.budget}</span>
            </div>
        </div>
      </div>
        `;
     


    $("#list").append(syntax);
  }

function loadTask() {
  console.log("Hello from loadTask");
  //...


$.ajax({
  type: "get",
  url: "http://fsdiapi.azurewebsites.net/api/tasks/",
  success: function(response){
    console.log("response", response)

    let data = JSON.parse(response);
    console.log("response json:", data);

    //travel the array, get some element from the array
    for(let i=0; i<data.length; i++){
      let task = data[i];

      console.log("this task is: ", task);
      if(task.name === "Vincent Ray"){
        console.log("....:",task);
        displayTask(task);
      }
    }

  }
})

}
function init() {
    $("#btnSave").click(saveTask)
    loadTask(taskSave);
}

window.onload = init