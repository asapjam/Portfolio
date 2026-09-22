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
// A RATING 1 THROUGH 5 AS AN INTEGER
class Testimonial extends DatabseObject{
    constructor(newReference, newComment, newRating){
        super();
        this.reference = newReference;
        this.comment = newComment;
        this.rating = newRating;
    }
    toString(){
        return this.comment + " " + this.rating + " star(s). - " + this.reference.toString() ;
    }
    static create(params){
        let {reference, comment, rating} = params;
        //TURN REFERENCE FROM GENERIC OBJECT, TO REFERENCE OBJECT
        if(!(reference instanceof Reference)){
            reference = Reference.create(reference)
        }
        //TURN RATING FROM STRING TO INT
        rating = parseInt(rating, 10);
        const newTestimonial = new Testimonial(reference, comment, rating);
        return newTestimonial;
        //FOR USE WITH .MAP FUNCTION...
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
    static create(params){
        const {name, company, email} = params;
        const newReference = new Reference(name, company, email);
        return newReference;
        //FOR USE WITH .MAP FUNCTION...
    }
}

class TestimonialDAO{
    static seeds = [
        {
            reference: new Reference("Jeff", "SillyHut", "jeff@jeffcloud.com"),
            comment: ["I'm commenting!"],
            rating: 5,
        },
        {
            reference: new Reference("Tom", "", "Tom@jeffcloud.com"),
            comment: ["Well, this is a much longer string... Cool isn't it? Yes well long strings can be fun and are great for testing formatting! Thanks for listening, ol chum."],
            rating: 4,
        },
        {
            reference: new Reference("Doug", "Gamestop", "Doug@jeffcloud.com"),
            comment: ["I'm the third strongest mole in this dungeon."],
            rating: 5,
        },
    ]
    store(){
        throw new Error("Somebody didn't implement something correctly...");
    }
    retrieve(){
        throw new Error("Somebody didn't implement something correctly...");
    }

}

class ReferenceDAO{
    store(){
        throw new Error("Somebody didn't implement something correctly...");
    }
    retrieve(){
        throw new Error("Somebody didn't implement something correctly...");
    }
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
        const objectReferences = JSON.parse(stringReferences)

        const arrayOfReferences = [];

        objectReferences.map((object) => {
            arrayOfReferences.push(Reference.create(object));
        });

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
            if (arrayOfTestimonials[0].reference.name == testimonial.reference.name){
                testimonial.comment.forEach((newComment) => {
                    arrayOfTestimonials[0].comment.push(newComment);
                })
            }
            else{
                arrayOfTestimonials.push(testimonial);
            }

        });
        // overwrite session storage with new array of testimonials
        this.database.setItem("testimonies", JSON.stringify(arrayOfTestimonials));
    }
    retrieve(){
        const stringTestimonies = this.database.getItem("testimonies");
        const objectTestimonies = JSON.parse(stringTestimonies);
        
        const arrayOfTestimonials = [];

        const seedArray = TestimonialDAO.seeds.map(seed => Testimonial.create(seed));
        if(!objectTestimonies){
            return seedArray;
        }

        objectTestimonies.map((object) => {
            arrayOfTestimonials.push(Testimonial.create(object));
        });

        return arrayOfTestimonials;
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

const session = new SessionStorageTestimonialDAO();

class CreateTestimonialService{
    constructor(newTestimonialDAO){
        this.testimonialToBeStored = newTestimonialDAO;
    }
    createTestimonial(){
        session.store(this.testimonialToBeStored);
        printTestimonials(session.retrieve());
    }
}

function getTestimonialFormData(session){
    const form = document.getElementById("testimonialForm");
        form.addEventListener("submit", (event) =>{
            event.preventDefault();
            
            const formData = new FormData(event.target);

            const name = formData.get("name");
            const company = formData.get("company");
            const email = formData.get("email");

            const comment = [formData.get("comment")];
            const rating = formData.get("rating");

            const newReference = new Reference(name, company, email);
            const newTestimonial = new Testimonial(newReference, comment, rating);
            
            session.store([newTestimonial]);
    });
}

const testimonialsTarget = document.getElementById("testimonialsTarget");

getTestimonialFormData(session);
printTestimonials(session.retrieve());
getAverageRating(session.retrieve());


function printTestimonials(arrayOfTestimonials){
    arrayOfTestimonials.forEach((testimonial) => {
        const listEntry = document.createElement("li");
        const paragraph = document.createElement("p");
        paragraph.textContent = testimonial.toString();
        listEntry.appendChild(paragraph);
        testimonialsTarget.appendChild(listEntry);
    });
}

function getAverageRating(arrayOfTestimonials){
    let average = 0;
    arrayOfTestimonials.forEach((testimonial) => {
        average += testimonial.rating
    });
    average /= arrayOfTestimonials.length;
    // average = average.toString();
    // average = average.slice(0, 4)
    console.log(average);
    
    document.getElementById("averageRating").textContent = "Average Rating: " + average + " / 5 stars";
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