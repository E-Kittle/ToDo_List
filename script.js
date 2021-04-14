const itemFactory = (title, priority, dueDate, description, status) => {
    return {title, priority, dueDate, description, status};
}

const projectFactory = (title, items) => {
    return {title, items};
}

// const projectManager;

// const itemManager;








// For the Overlay
const addNewProject = document.querySelector('#addNewProject');
addNewProject.addEventListener('click', () => {
    document.querySelector('.overlay').style.display = "flex";
    document.querySelector('.projectOverlay').style.display = "flex";
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