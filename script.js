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

    const getProjects = () => {
        return projectList;
    };

    return {addProj};
})();

const DOMManager = (() => {

    const newProject = (title) => {
        if (_validateProj()){                              
            // projectManager.addProj(title);
            console.log('perfect');
        }
        else{
            console.log('too short');
        }
        //Triggered by the 'add new project' button (has a preventDefault handler). Grabs the data from the form (do I need to use a validate function or can I just put a min char?), calls projectManager.addProj(title), calls saveData(), calls displayProjList(), clearProjForm(), 
    };

    const newItem = () => {
        //This is triggered by the 'add new item' button w/ a preventDefault handler. validateItem(), projectManager.newItem(), clearItemForm(), displayItemList(), saveData()
    };

    const displayProjList = () => {
        //Calls projectManager.getProjects() and saves to an array. 
    };

    const displayItemList = () => {
        //First, calls projectManager.getProjects(). Then checks to see which project is currently selected, loops through the list of items for that project, and updates the DOM with the items. 
    };

    
    const _validateProj = () => {
        if (newProjectInput.value.length > 0){
            projectError.textContent = "";
            return true;
        }
        else {
            projectError.textContent = "Please enter a project";
            return false;
        }
        //Still need to add functionality to check if book exists in memory. Could also make validation occur in realtime
    };
    
    const _validateItem = () => {
        //Validates the item form
    };
    
    const _clearProjForm = () => {
        //This clears the project form
    };
    
    const _clearItemForm = () => {
        //Clears the item form
    };
    
    
    const _saveData = () =>{
        
    };
    
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

    return {newProject};

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






// We'll need something to manage the list of projects on the sidebar
    //methods to add and remove projects
//We'll also need a module pattern to manage the manage the items within a project

let firstItem = itemFactory("Wash Dog", "urgent", "4/13");
let secondItem = itemFactory('sweep', 'meh', '4/15');

let arr = [firstItem, secondItem];

let firstProject = projectFactory('Chores', arr);
console.log(firstProject.title);
console.log(firstProject);