const projectItems = [
    {    
        title: "My First Project",
        url: "http://link.to.my.first.project.com",
        description: "My first project is the first project I ever made, and it's cool because...",
    },
    {    
        title: "My First Project",
        url: "http://link.to.my.first.project.com",
        description: "My first project is the first project I ever made, and it's cool because...",
    },
    {    
        title: "My First Project",
        url: "http://link.to.my.first.project.com",
        description: "My first project is the first project I ever made, and it's cool because...",
    },
];

const projectTargetDiv = document.getElementById("projectTarget");

projectItems.forEach(projectItem => {
    const titleText = projectItem.title;
    const urlText = projectItem.url;
    const descriptionText = projectItem.description;

    const newTitleDiv = document.createElement("div");
    newTitleDiv.classList.add("projectTitle");
    newTitleDiv.textContent = titleText;

    const newUrlDiv = document.createElement("div");
    newUrlDiv.classList.add("projectUrl");
    const newUrlAnchor = document.createElement("a");
    newUrlAnchor.href = urlText;
    newUrlAnchor.textContent = "Link";
    newUrlAnchor.title = "Go to Link...";
    newUrlDiv.appendChild(newUrlAnchor);

    const newDescriptionDiv = document.createElement("div");
    newDescriptionDiv.classList.add("projectDescription");
    newDescriptionDiv.textContent = descriptionText;

    projectTargetDiv.appendChild(newTitleDiv);
    projectTargetDiv.appendChild(newUrlDiv);
    projectTargetDiv.appendChild(newDescriptionDiv);


})