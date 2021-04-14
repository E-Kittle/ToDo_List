const itemFactory = (title, priority, dueDate, description, status) => {
    return {title, priority, dueDate, description, status};
}

const projectFactory = (title, items) => {
    return {title, items};
}

const projectManager = (() => {
    const projectList = [];
    

    return {};
})();


// const itemManager;



// Constants for DOM items

//These 4 are for opening and closing the overlay. 
const openProjectOverlay = document.querySelector('#addNewProject');
const closeProjectOverlay = document.querySelector('#closeProjectOverlay');
const openItemOverlay = document.querySelector('#addNewItem');
const closeItemOverlay = document.querySelector('#closeItemOverlay');
//constant for adding a new project or item to the overlay
const addNewProject = document.querySelector('#submitNewProject');




//Event Listener to add a new project
addNewProject.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Project added');
});

// For the Overlay - First two are for adding a new project and second two are for adding a new item
openProjectOverlay.addEventListener('click', () => {
    document.querySelector('.overlay').style.display = "flex";
    document.querySelector('.projectOverlay').style.display = "flex";
});

closeProjectOverlay.addEventListener('click', () => {
    document.querySelector('.overlay').style.display = "none";
    document.querySelector('.projectOverlay').style.display = "none";
});

openItemOverlay.addEventListener('click', () => {
    document.querySelector('.overlay').style.display = "flex";
    document.querySelector('.itemOverlay').style.display = "flex";
});

closeItemOverlay.addEventListener('click', () => {
    document.querySelector('.overlay').style.display = "none";
    document.querySelector('.itemOverlay').style.display = "none";
});






// We'll need something to manage the list of projects on the sidebar
    //methods to add and remove projects
//We'll also need a module pattern to manage the manage the items within a project

let firstItem = itemFactory("Wash Dog", "urgent", "4/13");
let secondItem = itemFactory('sweep', 'meh', '4/15');

let arr = [firstItem, secondItem];

let firstProject = projectFactory('Chores', arr);
console.log(firstProject.title);
console.log(firstProject);