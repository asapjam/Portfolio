const projectItems = [
    {    
        title: "Game of War",
        url: "https://github.com/asapjam/btech-software-dev-25-classroom-computer-programming-game-of-war-game-of-war-starter-csharp",
        description: "The card game War in C#!",
    },
    {    
        title: "Putt Kitty Putt!",
        url: "https://github.com/Quarz8/projectile-maze-game",
        description: "My first game! 30 levels of kitty-putting action!",
    },
    {    
        title: "My First Project",
        url: "http://link.to.my.first.project.com",
        description: "My first project is the first project I ever made, and it's cool because...",
    },
];

const projectTargetDiv = document.getElementById("projectTarget");
const newUnorderedList = projectTargetDiv.appendChild(document.createElement("ul"));

projectItems.forEach(projectItem => {
    const titleText = projectItem.title;
    const urlText = projectItem.url;
    const descriptionText = projectItem.description;

    const newListElement = document.createElement("li")

    const newTitleDiv = document.createElement("div");
    newTitleDiv.classList.add("projectTitle");
    const newTitleHeader = document.createElement("h3");
    newTitleHeader.textContent = titleText;
    newTitleDiv.appendChild(newTitleHeader);

    const newUrlDiv = document.createElement("div");
    newUrlDiv.classList.add("projectUrl");
    const newUrlAnchor = document.createElement("a");
    newUrlAnchor.href = urlText;
    newUrlAnchor.target = "_blank" //new tab on link open
    newUrlAnchor.textContent = "Link";
    newUrlAnchor.title = "Go to Link...";
    newUrlDiv.appendChild(newUrlAnchor);

    const newDescriptionDiv = document.createElement("div");
    newDescriptionDiv.classList.add("projectDescription");
    const newParagraph = document.createElement("p")
    newParagraph.textContent = descriptionText;
    newDescriptionDiv.appendChild(newParagraph);

    //LISTENER START

    newTitleDiv.addEventListener("click", () => {
        newTitleDiv.classList.toggle("active");
        newUrlDiv.classList.toggle("active");
        newDescriptionDiv.classList.toggle("active");
    });

    //LISTENER END
    
    newListElement.appendChild(newTitleDiv);
    newListElement.appendChild(newUrlDiv);
    newListElement.appendChild(newDescriptionDiv);

    newUnorderedList.appendChild(newListElement)
})

class DatabseObject{
    toString(){
        throw new Error("Somebody didn't implement something correctly...")
    }
}

//TESTIMONALS EXPECT THE FOLLOWING:
// A REFERENCE !OBJECT!
// AN ARRAY OF COMMENTS
// A RATING 1 THROUGH 5
class Testimonial extends DatabseObject{
    constructor(newReference, newComment, newRating){
        super();
        this.reference = newReference;
        this.comment = newComment;
        this.rating = newRating;
    }
    toString(){
        return this.comment + " - " + this.reference.name + " " + this.rating;
    }
}

class Reference extends DatabseObject{
    constructor(newName, newCompany, newEmail){
        super();
        this.name = newName;
        this.company = newCompany;
        this.email = newEmail;
    }
    toString(){
        if(this.company){
            return "Name: " + this.name + " Company: " + this.company + " Contact: " + this.email;
        }
        else{
            return "Name: " + this.name + " Contact: " + this.email;
        }
    }
}

class TestimonialDAO{
    static seeds = [
        {
            reference: new Reference("Jeff", "SillyHut", "jeff@jeffcloud.com"),
            comment: ["I'm commenting!"],
            rating: 100,
        },
        {
            reference: new Reference("Tom", "EB Games", "Tom@jeffcloud.com"),
            comment: ["I'm also commenting!"],
            rating: 80,
        },
        {
            reference: new Reference("Doug", "Gamestop", "Doug@jeffcloud.com"),
            comment: ["I'm the third strongest mole in this dungeon."],
            rating: 90,
        },
    ]
    store(){
        throw new Error("Somebody didn't implement something correctly...");
    }
    retrieve(){
        throw new Error("Somebody didn't implement something correctly...");
    }
    static create(params){
        const {reference, comment, rating} = params;
        const newTestimonial = new Testimonial(reference, comment, rating);
        return newTestimonial;
    }
}

class ReferenceDAO{
    store(){
        throw new Error("Somebody didn't implement something correctly...");
    }
    retrieve(){
        throw new Error("Somebody didn't implement something correctly...");
    }
    static create(params){
        const {name, company, email} = params;
        const newReference = new Reference(name, company, email);
        return newReference;
    }
    // The above is Javascript Object Destructuring, below does a similar thing
    // static create(newReferenceObj, newComment, newRating){
    //      const newObj = new Testimonial(newReferenceObj, newComment, newRating);
    //      return newObj;
    // }
}

class SessionStorageReferenceDAO extends ReferenceDAO{
    constructor(){
        super();
        this.database = sessionStorage;
    }
    store(arrayOfReferences){
        this.database.setItem("references", JSON.stringify(arrayOfReferences));
    }
    retrieve(){
        const stringReferences = this.database.getItem("references");
        const objectReferences = JSON.parse(stringReferences);
        return objectReferences;
    }

}

class SessionStorageTestimonialDAO extends TestimonialDAO{
    constructor(){
        super();
        this.database = sessionStorage;
    }
    store(arrayOfTestimonials){
        // get old testimonials from session storage
        this.retrieve().forEach((testimonial) => {
            arrayOfTestimonials.push(testimonial);
        });
        // overwrite session storage with new array of testimonials
        this.database.setItem("testimonies", JSON.stringify(arrayOfTestimonials));
    }
    retrieve(){
        const stringTestimonies = this.database.getItem("testimonies");
        const objectTestimonies = JSON.parse(stringTestimonies);
        
        const arrayOfTestimonials = [];

        objectTestimonies.map((object) => {
            arrayOfTestimonials.push(TestimonialDAO.create(object));
        });
        return arrayOfTestimonials;

        // objectTestimonies.forEach((object) => {
        //     arrayOfTestimonials.push(SessionStorageTestimonialDAO.create(object));
        // });
        // return arrayOfTestimonials;

    }
}

class CookieStorageReferenceDAO extends ReferenceDAO{
    constructor(){
        super();
        this.database = document.cookie;
    }
    store(arrayOfReferences){
        document.cookie = 'references=' + JSON.stringify(arrayOfReferences) + '; SameSite=Lax; Secure;';
    }
    retrieve(){
        const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("references="));
        // return... something...
    }
}

class CookieStorageTestimonialDAO extends TestimonialDAO{
    constructor(){
        super();
        this.database = document.cookie;
    }
    store(arrayOfTestimonials){
        document.cookie = 'testimonies=' + JSON.stringify(arrayOfTestimonials) + '; SameSite=Lax; Secure;';
    }
    retrieve(){
        const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("testimonies="));
    }
}

class CreateTestimonialService{
    constructor(newTestimonialDAO){
        this.testimonialToBeStored = newTestimonialDAO;
    }
    createTestimonial(){
        const activeSession = new SessionStorageTestimonialDAO();
        activeSession.store(testimonialToBeStored);
    }
}

function getTestimonialFormData(){
    const form = document.getElementById("testimonialForm");
        form.addEventListener("submit", (event) =>{
            const formData = new FormData(event.target);

            const nameInput = formData.get("name");
            const companyInput = formData.get("company");
            const emailInput = formData.get("email");

            const commentInput = formData.get("comment");
            const ratingInput = formData.get("rating");

            const newReference = ReferenceDAO.create([nameInput, companyInput, emailInput]);
            const newTestimonial = TestimonialDAO.create([newReference, commentInput, ratingInput]);

            const session = new CreateTestimonialService.store(newTestimonial);
            // session.store(TestimonialDAO.seeds.map(seed => TestimonialDAO.create(seed)));
    });
}

const testimonialsTarget = document.getElementById("testimonialsTarget");

// getTestimonialFormData();
// const seedArray = TestimonialDAO.seeds.map(seed => TestimonialDAO.create(seed));
// printTestimonials(seedArray);


function printTestimonials(arrayOfTestimonials){
    arrayOfTestimonials.forEach((testimonial) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = testimonial.toString();
        testimonialsTarget.appendChild(paragraph);
    });
}



const nameInput = document.getElementById("testimonialName");
const companyInput = document.getElementById("testimonialCompany");
const emailInput = document.getElementById("testimonialEmail");

const commentInput = document.getElementById("testimonialComment");
const ratingInput = document.getElementById("testimonialRating");

for(i = 0; i < 6; i++){
    const option = document.createElement("option");
    option.value = i;
    option.textContent = "Rating " + i;
    ratingInput.appendChild(option);
}


// //.map calls a function on each element ("seed") of the seeds array- in this case: create()
// console.log(seedArray);
// console.log(seedArray[1].toString());

// const activeSessionStorageTestimonialDAO = new SessionStorageTestimonialDAO();
// activeSessionStorageTestimonialDAO.store(seedArray);