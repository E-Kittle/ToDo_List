//Notes
//1 - I should have the sample project appear as the default project. Actually, I should have today appear as the default project
//2 - I need to add functionality to 'add a new item' 
//3 - Add a 'view more information' button to display an overlay with the items info - Incorporate an edit/delete option for this
//4 - Need to add event handlers to the checkboxes. That way when a user checks something off as done it becomes grayed out and remains checked - Add a new class
//5 - Also add a way to delete an item on the main todo screen
//6 - Add a way to delete an entire project - Ask the user if they're sure
//7 - Figure out how to utilize the dates. Important for viewing 'today' or 'this week' tasks






const itemFactory = (title, priority, dueDate, description, status) => {
    return { title, priority, dueDate, description, status };
}


const projectFactory = (title, items) => {
    return { title, items };
}


const projectManager = (() => {
    //This stores the list of projects with a demo project and associated items
    const projectList = [];

    //Adds a new project to the list. Takes in the title of the list, creates a new project, and adds it to the list
    const addProj = (title) => {
        let proj = projectFactory(title, []);
        projectList.push(proj);
        console.table(projectList);
    };

    const removeProj = () => {
        //This removes a project from the list. Likely should take in the index of the project 
    };


    const addItem = (arr) => {

        //We have a new item. Create the new item, find which index the project is located on


        // let status = false;
        let item = itemFactory(arr[0], arr[1], arr[2], arr[3], status);
        console.log(item);
        // projectList[index].items.push(item);
        console.table(projectList);

        // // projectTitle.setAttribute('id', 'samp');
        // let index = projectTitle.getAttribute('id');
        // console.log(`Current index: ${index}`);
        // console.log('this sucks');
        //I've created the new item. Now I need to figure out what the index is of the project and then I can add it to the project's item list and then update the DOM

        //Could grab the index from the currently selected tab..........
        //What about the default tab then? UGYHHH. I could set that as the default, onload, tab - Problems for later...


        //this takes in a new item object and adds it to the item array
    };

    const updateItem = () => {
        //This will be complicated. The only updating is to update an item in the list. Maybe I should take in the new item, splice out the old one, and add in the new one 
        //I think that splicing allows us to replace an item so I can do this in one move. Alternatively, I could just update the updated portion but that would likely require excessive code, probably faster and 'cheaper' to just replace it. 
    };

    const saveProjects = () => {
        localStorage.setItem('projectList', JSON.stringify(projectList));
    };

    const getProjects = () => {
        let projects = JSON.parse(localStorage.getItem('projectList'));
        if (projects === null) {
            //Fill with sample data
            projects = [{ title: 'Sample Project', items: [{ title: 'Item 1', priority: 'High', dueDate: 2021 - 04 - 05, description: 'This is item 1', status: false }, { title: 'Item 2', priority: 'Low', dueDate: 2021 - 04 - 09, description: 'This is item 2', status: true }, { title: 'Item 3', priority: 'High', dueDate: 2021 - 04 - 05, description: 'This is item 3', status: false }] }];
        }
        projectList.splice(0, projectList.length);
        projects.forEach(arr => {
            projectList.push(arr);
        })
        return projectList;
    };


    return { addProj, getProjects, saveProjects, addItem };
})();




const DOMManager = (() => {

    //This is triggered by the 'add new project' button. It validates the data, adds and saves it to the array, and updates the DOM
    const newProject = (title) => {
        //If validation fails, all errors are handled by _validateProj
        if (_validateProj()) {
            projectManager.addProj(newProjectInput.value);
            projectManager.saveProjects();      //Should this be in the addProj section?
            _clearProjForm();
            overlay.closeProjOverlay();
            displayProjList();
            //This adds the project to the list but does not make it the active project
        }
    };

    //Still in progress. Currently grabs the data from the fields and displays it as an array. It does send it to projectManager to 'create the item' but it still needs to be appended to the appropriate project
    const newItem = (index) => {
        console.log(`Associated index: ${index}`);
        let arr = _validateItem();
        projectManager.addItem(arr);
        //This is triggered by the 'add new item' button w/ a preventDefault handler. validateItem(), projectManager.newItem(), clearItemForm(), displayItemList(), saveData()
    };

    const displayProjList = () => {
        let projects = projectManager.getProjects();
        let index = 0;
        projectHolder.innerHTML = "";
        projects.forEach((proj) => {
            const newProj = document.createElement('button');
            newProj.classList.add('projectButton');
            newProj.setAttribute('id', index);
            newProj.textContent = proj.title;
            projectHolder.appendChild(newProj);
            index++;
        });
    };

    const displayProject = (index) => {
        //Why did I grab the attributes? I think this was for the items... Might be good anyways in the long run
        let projects = projectManager.getProjects();
        if (index === 'weekButton') {
            projectTitle.removeAttribute('id');
            projectTitle.textContent = "This Week";
            projectTitle.setAttribute('id', 'week');
        }
        else if (index === 'todayButton') {
            projectTitle.removeAttribute('id');
            projectTitle.textContent = "Today";
            projectTitle.setAttribute('id', 'today');
        }
        else {
            projectTitle.removeAttribute('id');
            projectTitle.textContent = projects[index].title;
            projectTitle.setAttribute('id', index);
            _displayItems(index, projects[index].items);
        }

        //First, calls projectManager.getProjects(). Then checks to see which project is currently selected, loops through the list of items for that project, and updates the DOM with the items. 
    };

    //This is passed the list of items associated with the corresponding project. These are used to update the DOM
    const _displayItems = (projectIndex, itemList) => {
        console.table(itemList);
        let index = 0;

        const items = document.querySelector('.items');

        items.innerHTML = "";

        itemList.forEach(item => {
            //Create div (class itemContainer), checkbox, title, priority, dueDate
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('itemContainer');
            itemContainer.classList.add('item');

            const itemStart = document.createElement('div');
            itemStart.classList.add('itemStart');
            const itemEnd = document.createElement('div');
            itemEnd.classList.add('itemEnd');

            const check = document.createElement('input');
            check.setAttribute('type', 'checkbox');
            check.classList.add('completed');
            check.setAttribute('id', index);

            const title = document.createElement('p');
            title.textContent = item.title;

            const priority = document.createElement('p');
            priority.textContent = item.priority;

            const dueDate = document.createElement('p');
            dueDate.textContent = item.dueDate;

            //Append all children
            itemStart.appendChild(check);
            itemStart.appendChild(title);
            itemEnd.appendChild(priority);
            itemEnd.appendChild(dueDate);
            itemContainer.appendChild(itemStart);
            itemContainer.appendChild(itemEnd);
            // itemWrapper.appendChild(itemContainer);
            items.appendChild(itemContainer);
            index++;
        });


        //Add a button that allows the user to add new items
        const newItemBtn = document.createElement('button');
        newItemBtn.classList.add('addNew');
        newItemBtn.classList.add('addNewItem');
        newItemBtn.setAttribute('id', projectIndex);
        newItemBtn.textContent = '+';
        items.appendChild(newItemBtn);
    }

    // This valides the 'add new project' input. It ensures that the project doesn't already exist in memory and ensures there's something already written
    //to the text field
    const _validateProj = () => {
        let projects = projectManager.getProjects();
        let pass = true;

        projects.forEach((proj) => {
            if (proj.title.toLowerCase() === newProjectInput.value.toLowerCase()) {
                projectError.textContent = "Project already exists";
                pass = false;
            }
        });

        if (!pass) {
            return false;
        }
        else if (newProjectInput.value.length > 0) {
            projectError.textContent = "";
            return true;
        }
        else {
            projectError.textContent = "Please enter a project";
            return false;
        }
    };

    const _validateItem = () => {
        //Validates the item form
        //Should return an array of items if valid
        //Constants for the form inputs and associated error handlers
        const itemDescrip = document.querySelector('#itemDescrip');

        //Need to research the date stuff and radio buttons

        //Validation for the item title - Will need to add validation that checks if the item exists in the immediate projects list...
        const newItemInput = document.querySelector('#itemTitle');
        const newItemInputError = document.querySelector('#itemTitleError');
        if (newItemInput.value.length <= 0) {
            newItemInputError.textContent = "Enter a title for the item"
            return [];
        }

        //Validation for the dueDate - can't be scheduled in the past - Too complicated right now. leave for later
        const dueDate = document.querySelector('#dueDate');
        const dueDateError = document.querySelector('#dueDateError');
        let today = new Date();

        //For the radiobuttons
        const rbs = document.querySelectorAll('input[name="priority"]');
        let priority;
        rbs.forEach(btn => {
            if (btn.checked) {
                priority = btn.value;

            }
        });

        return [newItemInput.value, priority, dueDate.value, itemDescrip.value];

    };

    //This clears the project form
    const _clearProjForm = () => {
        newProjectInput.value = "";
    };

    const _clearItemForm = () => {
        //Clears the item form
    };


    //For modifying projects - Add later
    const updateProj = () => {
        //This 
    };

    const updateItem = () => {

    };

    const removeProj = () => {

    };

    const removeItem = () => {

    };

    return { newProject, displayProjList, displayProject, newItem};

})();

const overlay = (() => {
    //Could add two constants for checking if the other overlay is open. This will prevent both overlays from being opened at the same time in the background

    const openProjOverlay = () => {
        document.querySelector('.overlay').style.display = "flex";
        document.querySelector('.projectOverlay').style.display = "flex";
        newProjectInput.focus();
    };

    const closeProjOverlay = () => {
        document.querySelector('.overlay').style.display = "none";
        document.querySelector('.projectOverlay').style.display = "none";
    };

    const openItmOverlay = () => {
        document.querySelector('.overlay').style.display = "flex";
        document.querySelector('.itemOverlay').style.display = "flex";
    };

    const closeItmOverlay = () => {
        document.querySelector('.overlay').style.display = "none";
        document.querySelector('.itemOverlay').style.display = "none";
    };

    return { openProjOverlay, closeProjOverlay, closeItmOverlay, openItmOverlay };
})();

// Constants for DOM items

//These 4 are for opening and closing the overlay. 
const openProjectOverlay = document.querySelector('#addNewProject');
const closeProjectOverlay = document.querySelector('#closeProjectOverlay');
const closeItemOverlay = document.querySelector('#closeItemOverlay');
//constant for adding a new project or item to the overlay
const projectHolder = document.querySelector('.newProjectHolder');
const projectWrapper = document.querySelector('.projectWrapper');

const newProjectInput = document.querySelector('#newProject');
const projectError = document.querySelector('#projectError');
const projectTitle = document.querySelector('.projectTitle');

const itemWrapper = document.querySelector('.itemWrapper');


//Event Listener to add a new project
const addNewProject = document.querySelector('#submitNewProject');
addNewProject.addEventListener('click', function (event) {
    event.preventDefault();
    DOMManager.newProject();
});


//Event handlers (and associated function) for opening a project and displaying its items
// Important function for assigning an event handler to each button created by the DOM
function hasClass(elem, className) {
    return elem.classList.contains(className);
}

projectWrapper.addEventListener('click', function (e) {
    if (hasClass(e.target, 'projectButton')) {
        let index = e.target.id;
        console.log(`Button: ${index} pressed`);
        DOMManager.displayProject(index);
    }
})

//Event listener to add a new item
itemWrapper.addEventListener('click', function(e) {
    if (hasClass(e.target, 'addNewItem')) {
        e.preventDefault();
        let index = e.target.id;
        DOMManager.newItem(index);
    }
});

// const newItemButton = document.querySelector('#submitNewItem');
// newItemButton.addEventListener('click', function (e) {
//     e.preventDefault();
//     //Need to grab the index from the button!!!
//     DOMManager.newItem(index);
// })

// For the Overlay - First two are for adding a new project and second two are for adding a new item
openProjectOverlay.addEventListener('click', () => {
    overlay.openProjOverlay();
});

closeProjectOverlay.addEventListener('click', () => {
    overlay.closeProjOverlay();
});

//Opens the item overlay
itemWrapper.addEventListener('click', function (e) {
    if (hasClass(e.target, 'addNew')) {
        let index = e.target.id;
        overlay.openItmOverlay();
    }
});

closeItemOverlay.addEventListener('click', function (e) {
    e.preventDefault();
    overlay.closeItmOverlay();
});






//Will have to be updated in the future to display one of the projects
window.onload = DOMManager.displayProjList();






// We'll need something to manage the list of projects on the sidebar
//methods to add and remove projects
//We'll also need a module pattern to manage the manage the items within a project

// let firstItem = itemFactory("Wash Dog", "urgent", "4/13");
// let secondItem = itemFactory('sweep', 'meh', '4/15');

// let arr = [firstItem, secondItem];

// let firstProject = projectFactory('Chores', arr);
// console.log(firstProject.title);
// console.log(firstProject);

//Right now we have a problem... opening each of the projects. 



//To open a project: User clicks on the project they want to look at. This will trigger an event listener that will display the correct project title and load all of the items to the item list.

//Essentially I need to create a sample project. It should actually already have an index of 0. 