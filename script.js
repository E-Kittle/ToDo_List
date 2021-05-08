//Notes
//Add functionality to the 'edit/modify' button
//Either delete the 'today' and 'this week' section or add functionality to them. It's not difficult to loop through them and put the appropriate items into an array; however, whenever I want to update whether an item is done or display the overlay I always grab the projectID from the title. Now, we can't do that since the projectID for the title will be 'today' or 'thisweek'
//Add 'sort by' methods





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
        saveProjects();
    };

    const removeProj = (index) => {
        projectList.splice(index, 1);
        saveProjects();
    };

    //This adds a new item to the appropriate project in the array and then saves the data
    const addItem = (arr, index) => {
        let item = itemFactory(arr[0], arr[1], arr[2], arr[3], status);
        projectList[index].items.push(item);
        saveProjects();
    };

    const updateItem = () => {
        //This will be complicated. The only updating is to update an item in the list. Maybe I should take in the new item, splice out the old one, and add in the new one 
        //I think that splicing allows us to replace an item so I can do this in one move. Alternatively, I could just update the updated portion but that would likely require excessive code, probably faster and 'cheaper' to just replace it. 
    };

    const completeItem = (projIndex, index, newStatus) => {
        projectList[projIndex].items[index].status = newStatus;
        saveProjects();
        DOMManager.displayProject(projIndex);
    };

    const removeItem = (index, projIndex) => {
        projectList[projIndex].items.splice(index, 1)
        saveProjects();
    };

    const saveProjects = () => {
        localStorage.setItem('projectList', JSON.stringify(projectList));
    };

    const getProjects = () => {
        let projects = JSON.parse(localStorage.getItem('projectList'));
        if (projects === null) {
            //Fill with sample data
            projects = [{ title: 'Sample Project', items: [{ title: 'Item 1', priority: 'High', dueDate: '2021-04-08', description: 'This is item 1', status: false }, { title: 'Item 2', priority: 'Low', dueDate: '2021-04-08', description: 'This is item 2', status: true }, { title: 'Item 3', priority: 'High', dueDate: '2021-04-08', description: 'This is item 3', status: false }] }];
        }
        projectList.splice(0, projectList.length);
        projects.forEach(arr => {
            projectList.push(arr);
        })
        return projectList;
    };

    return { addProj, getProjects, saveProjects, addItem, removeProj, removeItem, completeItem };
})();




const DOMManager = (() => {
    const items = document.querySelector('.items');

    //This is triggered by the 'add new project' button. It validates the data, adds and saves it to the array, and updates the DOM
    const newProject = (title) => {
        //If validation fails, all errors are handled by _validateProj
        let newProj = formManager.validateProj();
        if (newProj != "") {
            projectManager.addProj(newProj);
            overlay.closeProjOverlay();
            displayProjList();
        }
    };

    //Still in progress. Currently grabs the data from the fields and displays it as an array. It does send it to projectManager to 'create the item' but it still needs to be appended to the appropriate project
    const newItem = (index) => {

        let arr = formManager.validateItem();
        if (arr.length > 0) {
            projectManager.addItem(arr, index);
            displayProject(index);
            overlay.closeItmOverlay();

            // _clearItemForm();
            // _displayItems(index, projectManager(index));
        }
        //This is triggered by the 'add new item' button w/ a preventDefault handler. validateItem(), projectManager.newItem(), clearItemForm(), displayItemList(), saveData()
    };

    const displayProjList = () => {
        let projects = projectManager.getProjects();
        let index = 0;
        projectHolder.innerHTML = "";
        projects.forEach((proj) => {
            const newProj = document.createElement('div');
            newProj.classList.add('projectButton');
            newProj.setAttribute('id', index);

            const newProjTitle = document.createElement('h3');
            newProjTitle.textContent = proj.title;

            const delButton = document.createElement('button');
            delButton.textContent = 'X';
            delButton.classList.add('closeButton');
            delButton.classList.add('delProjOverlay');
            delButton.setAttribute('id', index);

            newProj.appendChild(newProjTitle);
            newProj.appendChild(delButton);
            projectHolder.appendChild(newProj);
            index++;
        });

    };

    const displayProject = (index) => {
        //Why did I grab the attributes? I think this was for the items... Might be good anyways in the long run
        let projects = projectManager.getProjects();
        // console.log(`Kids suck: ${index}`);

        // console.log(projects[index]);
        if (index == 'weekButton') {
            projectTitle.removeAttribute('id');
            projectTitle.textContent = "This Week";
            projectTitle.setAttribute('id', 'week');
            items.innerHTML = "";
        }
        else if (index === 'todayButton' || projects[index] === undefined) {
            projectTitle.removeAttribute('id');
            projectTitle.textContent = "Today";
            projectTitle.setAttribute('id', 'today');
            items.innerHTML = "";
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
        let index = 0;
        items.innerHTML = "";

        itemList.forEach(item => {
            let itemContainer = _displayItem(item, projectIndex, index);
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

    const _displayItem = (item, projectIndex, index) => {
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
            check.setAttribute('data-key', projectIndex);

            const title = document.createElement('p');
            title.textContent = item.title;
            if (item.status === true) {
                title.classList.add('completedItem');
                check.checked = true;
            }

            const priority = document.createElement('p');
            priority.textContent = item.priority;

            const dueDate = document.createElement('p');
            dueDate.textContent = item.dueDate;

            //Adds a 'delete' button
            const delButton = document.createElement('button');
            delButton.textContent = 'X';
            delButton.classList.add('closeButton');
            delButton.classList.add('delItem');
            delButton.setAttribute('id', index);
            delButton.setAttribute('data-key', projectIndex);

            const moreButton = document.createElement('button');
            moreButton.textContent = 'Details';
            moreButton.classList.add('detailsButton');
            moreButton.setAttribute('id', index);
            moreButton.setAttribute('data-key', projectIndex);

            //Append all children
            itemStart.appendChild(check);
            itemStart.appendChild(title);
            itemEnd.appendChild(priority);
            itemEnd.appendChild(dueDate);
            itemEnd.appendChild(moreButton);
            itemEnd.appendChild(delButton);
            itemContainer.appendChild(itemStart);
            itemContainer.appendChild(itemEnd);
            return itemContainer;
    }

    //Updates the title for the delProjectOverlay to double check if the user wants to delete the project
    const delProj = (index) => {
        let projects = projectManager.getProjects();
        projectTitle.textContent = projects[index].title;
    }

    const itemDetails = (index, projIndex) => {
        console.log(`Viewing item: ${index}, in project: ${projIndex}`);

        const detailTitle = document.querySelector('#detailTitle');
        const detailDescrip = document.querySelector('#detailDesc');
        const detailPriority = document.querySelector('#detailPriority');
        const detailDate = document.querySelector('#detailDate');
        let projects = projectManager.getProjects();
        let item = projects[projIndex].items[index];

        detailTitle.textContent = item.title;
        detailDescrip.textContent = `Description: ${item.description}`;
        detailPriority.textContent = `Priority: ${item.priority}`;
        detailDate.textContent = `Due Date: ${item.dueDate}`;

        //Not sure this is the correct thing to set it to
        editItem.setAttribute('id', index);
    }

    return { newProject, displayProjList, displayProject, newItem, delProj, itemDetails };

})();


const dateManager = (() => {

    const getToday = () => {
        var today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        if (month.length = 1) {
            month = `0${month}`;
        }
        let day = today.getDate();
        if (day.length = 1) {
            day = `0${day}`
        }

        let date = `${year}-${month}-${day}`;
        console.log(`In method: ${date}`);
    }

    return {getToday};

    //Use getToday() to grab todays date. Then send it to 
})();

dateManager.getToday();

const formManager = (() => {
    // This valides the 'add new project' input. It ensures that the project doesn't already exist in memory and ensures there's something already written
    //to the text field

    const newItemInput = document.querySelector('#itemTitle');
    const itemDescrip = document.querySelector('#itemDescrip');
    const dueDate = document.querySelector('#dueDate');

    const validateProj = () => {
        let projects = projectManager.getProjects();
        let pass = true;

        projects.forEach((proj) => {
            if (proj.title.toLowerCase() === newProjectInput.value.toLowerCase()) {
                projectError.textContent = "Project already exists";
                pass = false;
            }
        });

        if (!pass) {
            return "";
        }
        else if (newProjectInput.value.length > 0) {
            projectError.textContent = "";
            let title = newProjectInput.value;
            _clearProjForm();
            return title;
        }
        else {
            projectError.textContent = "Please enter a project";
            return "";
        }
    };
    //This validates the item form. If validation passes, it returns an array of the items, if it fails it returns an empty array
    const validateItem = () => {

        //Validation for the description 
        let descrip;
        if (itemDescrip.value === "") {
            descrip = "No description provided";
        }
        else {
            descrip = itemDescrip.value;
        }

        //Validation for the item title - Will need to add validation that checks if the item exists in the immediate projects list...
        const newItemInputError = document.querySelector('#itemTitleError');
        if (newItemInput.value.length <= 0) {
            newItemInputError.textContent = "Enter a title for the item"
            return [];
        }
        else {
            newItemInputError.textContent = "";
        }

        //Validation for the dueDate - can't be scheduled in the past - Too complicated right now. leave for later
        const dueDateError = document.querySelector('#dueDateError');
        if (dueDate.value == "") {
            dueDateError.textContent = "Please select a due date";
            return [];
        }
        else {
            dueDateError.textContent = "";
        }

        //For the radiobuttons
        const rbs = document.querySelectorAll('input[name="priority"]');
        let priority;
        rbs.forEach(btn => {
            if (btn.checked) {
                priority = btn.value;
            }
        });

        let arr = [newItemInput.value, priority, dueDate.value, descrip];
        _clearItemForm();
        return arr;
    };

    //This clears the project form
    const _clearProjForm = () => {
        newProjectInput.value = "";
    };

    //Clears the item form
    const _clearItemForm = () => {
        newItemInput.value = "";
        itemDescrip.value = "";
        dueDate.value = "";
    };

    return { validateProj, validateItem };
})();

//For modifying projects - Add later
const modifyProjects = (() => {
    const updateItem = () => {

    };

    const removeProj = () => {

    };

    const removeItem = () => {

    };
})();


const overlay = (() => {
    //Could add two constants for checking if the other overlay is open. This will prevent both overlays from being opened at the same time in the background

    const delOverlay = document.querySelector('.delProjOverlay');

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

    const openDelProjOverlay = () => {
        document.querySelector('.overlay').style.display = "flex";
        document.querySelector('.deleteOverlay').style.display = "flex";
    }

    const closeDelProjOverlay = () => {
        document.querySelector('.overlay').style.display = "none";
        document.querySelector('.deleteOverlay').style.display = "none";
    }

    const openDetailsOverlay = () => {
        document.querySelector('.overlay').style.display = "flex";
        document.querySelector('.detailsOverlay').style.display = "flex";
    }

    const closeDetailsOverlay = () => {
        document.querySelector('.overlay').style.display = "none";
        document.querySelector('.detailsOverlay').style.display = "none";
    }


    return { openProjOverlay, closeProjOverlay, closeItmOverlay, openItmOverlay, openDelProjOverlay, closeDelProjOverlay, openDetailsOverlay, closeDetailsOverlay };
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
const itemWrapper = document.querySelector('.itemWrapper');
const projectTitle = document.querySelector('.projectTitle');
const editItem = document.querySelector('#editButton');

//Event Listener to add a new project
const addNewProject = document.querySelector('#submitNewProject');
addNewProject.addEventListener('click', function (e) {
    e.preventDefault();
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




//For adding a new item
const newItemButton = document.querySelector('#submitNewItem');
newItemButton.addEventListener('click', function (e) {
    e.preventDefault();
    index = newItemButton.getAttribute('id');
    DOMManager.newItem(index);
})



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
        newItemButton.setAttribute('id', index);
        overlay.openItmOverlay();
    }
});

closeItemOverlay.addEventListener('click', function (e) {
    e.preventDefault();
    overlay.closeItmOverlay();
});


//For the delete project button - Brings up the overlay
const closeDelProjOverlayButton = document.querySelector('#closeDelProjOverlay');
const confirmButton = document.querySelector('#confirmButton');
const abortButton = document.querySelector('.abortButton');

//Displays the confirmation overlay to ensure user wants to delete the project and all items
//Adds an id attribute to the confirmation button to allow ease of deleting the indexed project
projectWrapper.addEventListener('click', function (e) {
    if (hasClass(e.target, 'delProjOverlay')) {
        let index = e.target.id;
        overlay.openDelProjOverlay();
        DOMManager.delProj(index);
        confirmButton.setAttribute('id', index);
    }
})

//These two both close the overlay... too redundant or necessary for users?
closeDelProjOverlayButton.addEventListener('click', () => {
    overlay.closeDelProjOverlay()
});

abortButton.addEventListener('click', () => {
    overlay.closeDelProjOverlay();
});

//Triggered by the 'yes' button - removes the project from the project array, closes the overlay, and updates the DOM
confirmButton.addEventListener('click', () => {
    let index = confirmButton.getAttribute('id');
    projectManager.removeProj(index);
    overlay.closeDelProjOverlay();
    DOMManager.displayProjList();
    DOMManager.displayProject(0);
});

//For the 'delete item' button
itemWrapper.addEventListener('click', function (e) {
    if (hasClass(e.target, 'delItem')) {
        let index = e.target.id;
        let projIndex = e.target.getAttribute('data-key');
        projectManager.removeItem(index, projIndex);
        DOMManager.displayProject(projIndex);
    }
});

//For the 'item details' buttons
itemWrapper.addEventListener('click', function (e) {
    if (hasClass(e.target, 'detailsButton')) {
        overlay.openDetailsOverlay();
        let index = e.target.id;
        let projIndex = e.target.getAttribute('data-key');
        DOMManager.itemDetails(index, projIndex);

    }
});

const closeItemDetails = document.querySelector('#closeItemDetails');
closeItemDetails.addEventListener('click', () => {
    overlay.closeDetailsOverlay();
})

//For the checkboxes to update the status of the item
itemWrapper.addEventListener('change', function (e) {
    if (hasClass(e.target, 'completed')) {
        let index = e.target.id;
        let checked = e.target.checked;
        let projIndex = e.target.getAttribute('data-key');
        projectManager.completeItem(projIndex, index, checked);
    }
});

//Loads the page and displays the sample project by default - If the page refreshes it does take
//the user back to sample project...
window.onload = DOMManager.displayProjList();
window.onload = DOMManager.displayProject(0);




