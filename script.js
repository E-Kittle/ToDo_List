const itemFactory = (title, priority, dueDate, description, status) => {
    return {title, priority, dueDate, description, status};
}

const projectFactory = (title, items) => {
    return {title, items};
}

const projectManager = (() => {
    //This stores the list of projects
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

    const updateProj = () => {
        //This will be complicated. The only updating is to update an item in the list. Maybe I should take in the new item, splice out the old one, and add in the new one 
        //I think that splicing allows us to replace an item so I can do this in one move. Alternatively, I could just update the updated portion but that would likely require excessive code, probably faster and 'cheaper' to just replace it. 
    };

    const newItem = () => {
        //this takes in a new item object and adds it to the item array
    };

    const saveProjects = () => {
        localStorage.setItem('projectList', JSON.stringify(projectList));
    };

    const getProjects = () => {
        let projects = JSON.parse(localStorage.getItem('projectList'));
        if (projects === null){
            projects = [];
        }
        projectList.splice(0, projectList.length);
        projects.forEach(arr => {
            projectList.push(arr);
        })
        return projectList;
    };


    return {addProj, getProjects, saveProjects};
})();




const DOMManager = (() => {

    //This is triggered by the 'add new project' button. It validates the data, adds and saves it to the array, and updates the DOM
    const newProject = (title) => {
        if (_validateProj()){                                   //If validation failed, all errors are handled by _validateProj
            projectManager.addProj(newProjectInput.value);
            projectManager.saveProjects();
            _clearProjForm();
            overlay.closeProjOverlay();
            displayProjList();
        }
    };

    const newItem = () => {
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
            index ++;
        });
    };

    const displayProject = (index) => {
        const projectTitle = document.querySelector('.projectTitle');
        let projects = projectManager.getProjects();
        if (index === 'sampleButton'){
            projectTitle.textContent = "Sample Project";    
        }
        else if (index === 'weekButton'){
            projectTitle.textContent = "This Week";
        }
        else if (index === 'todayButton'){
            projectTitle.textContent = "Today";
        }
        else{
            projectTitle.textContent = projects[index].title;
        }
        //First, calls projectManager.getProjects(). Then checks to see which project is currently selected, loops through the list of items for that project, and updates the DOM with the items. 
    };

    //This is passed the list of items associated with the corresponding project. These are used to update the DOM
    const _displayItems = (itemList) => {

    }

    // This valides the 'add new project' input. It ensures that the project doesn't already exist in memory and ensures there's something already written
    //to the text field
    const _validateProj = () => {
        let projects = projectManager.getProjects();
        let pass = true;

        projects.forEach((proj) => {
            if (proj.title.toLowerCase() === newProjectInput.value.toLowerCase()){
                projectError.textContent = "Project already exists";
                pass = false;
            }
        });

        if (!pass){
            return false;
        }
        else if (newProjectInput.value.length > 0){
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
    };
    
    //This clears the project form
    const _clearProjForm = () => {
        newProjectInput.value = "";
    };
    
    const _clearItemForm = () => {
        //Clears the item form
    };
    
    
    // const _saveData = () =>{
    //     localStorage.setItem('allProjects, JSON.stringify(')
    // };
    
    const loadData = () => {
        //Triggered by a page reload
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

    return {newProject, displayProjList, displayProject};

})();

const overlay = (() => {
    const openProjOverlay = () => {
        document.querySelector('.overlay').style.display = "flex";
        document.querySelector('.projectOverlay').style.display = "flex";
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

    return {openProjOverlay, closeProjOverlay, closeItmOverlay, openItmOverlay};
})();

// Constants for DOM items

//These 4 are for opening and closing the overlay. 
const openProjectOverlay = document.querySelector('#addNewProject');
const closeProjectOverlay = document.querySelector('#closeProjectOverlay');
const openItemOverlay = document.querySelector('#addNewItem');
const closeItemOverlay = document.querySelector('#closeItemOverlay');
//constant for adding a new project or item to the overlay
const addNewProject = document.querySelector('#submitNewProject');
const newProjectInput = document.querySelector('#newProject');
const projectError = document.querySelector('#projectError');

const projectHolder = document.querySelector('.newProjectHolder');
const projectWrapper = document.querySelector('.projectWrapper');

//Event Listener to add a new project
addNewProject.addEventListener('click', function(event) {
    event.preventDefault();
    DOMManager.newProject();
});




// For the Overlay - First two are for adding a new project and second two are for adding a new item
openProjectOverlay.addEventListener('click', () => {
    overlay.openProjOverlay();
});

closeProjectOverlay.addEventListener('click', () => {
    overlay.closeProjOverlay();
});

openItemOverlay.addEventListener('click', () => {
    overlay.openItmOverlay();
});

closeItemOverlay.addEventListener('click', () => {
    overlay.closeItmOverlay();
});


//Event handlers (and associated function) for opening a project and displaying its items
// Important function for assigning an event handler to each button created by the DOM
function hasClass(elem, className) {
    return elem.classList.contains(className);
}

projectWrapper.addEventListener('click', function(e) {
    if (hasClass(e.target, 'projectButton')) {
        let index = e.target.id;
        console.log(`Button: ${index} pressed`);
        DOMManager.displayProject(index);
    }
})





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