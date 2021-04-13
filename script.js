const itemFactory = (title, priority, dueDate) => {
    return {title, priority, dueDate};
}

const projectFactory = (title, items) => {
    return {title, items};
}

const projectManager;

const itemManager;


// We'll need something to manage the list of projects on the sidebar
    //methods to add and remove projects
//We'll also need a module pattern to manage the manage the items within a project

let firstItem = itemFactory("Wash Dog", "urgent", "4/13");
let secondItem = itemFactory('sweep', 'meh', '4/15');

let arr = [firstItem, secondItem];

let firstProject = projectFactory('Chores', arr);
console.log(firstProject.title);
console.log(firstProject);