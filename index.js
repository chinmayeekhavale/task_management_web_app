// const taskContainer= document.querySelector(".task__container");
// console.log(taskContainer);

let globalStore= [];

//FUNCTION TO GENERATE A NEW CARD
const generateNewCard = (taskData) => `
    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
        <div class="card">
            <div class="card-header d-flex justify-content-between gap-2">
                <div class="taskheading">
                    <h3 class="text-primary fw-bold">${taskData.taskType}</h3>
                </div>
                <div>
                    <button type="button" class="btn btn-outline-success">
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
                        <i class="fa fa-trash" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <img class="card-img-top" src=${taskData.imageUrl} alt="Card Image">
                <h5 class="card-title mt-3 fw-bold">${taskData.taskTitle}</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.${taskData.taskDescription}</p>
                <a href="${taskData.taskLocation}" class="btn btn-primary">${taskData.taskType}</a>
            </div>
        </div>
    </div>
`;

//LOADS THE FIRST INITIAL SAMPLE CARD
const loadInitialCardData= () => {
    //localstorage to get tasky card data
    const getCardData= localStorage.getItem("Taskit");

    //convert to normal object
    const {cards}= JSON.parse(getCardData);

    //loop over those array of task objects to create HTML card, inject it to DOM
    cards.map((cardObject) => {
        document.querySelector(".task__container").insertAdjacentHTML("beforeend", generateNewCard(cardObject));

        //update our globalStore
        globalStore.push(cardObject);
    }); 
};

//FUNCTION TO DELETE CARD 
const deleteCard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
    
    localStorage.setItem("Taskit", JSON.stringify({cards: globalStore}));

    if(tagname === "BUTTON") {
        return document.querySelector(".task__container").removeChild(event.target.parentNode.parentNode.parentNode.parentNode);

    }
    else {
        return document.querySelector(".task__container").removeChild(event.target.parentNode.parentNode.parentNode.parentNode.parentNode);
    }
};


//FUNCTION TO SAVE THE CHANGES IN LOCAL
const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
        taskLocation: document.getElementById("tasklocation").value
    };

    

    document.querySelector(".task__container").insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);
    localStorage.setItem("Taskit",JSON.stringify({cards:globalStore}));

}; 