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
        let stringReference = "Name: " + this.name;
        if(this.company){stringReference += " Company: " + this.company;}
        if(this.email){stringReference += " Contact: " + this.email;}
        return stringReference;
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
            comment: ["James has been an invaluable asset to our team!"],
            rating: 5,
        },
        {
            reference: new Reference("Tom", "", "Tom@jeffcloud.com"),
            comment: ["We are very impressed with James's work ethic and dedication."],
            rating: 4,
        },
        {
            reference: new Reference("Mole #3", "MoleMart", ""),
            comment: ["I'm one of the masters of this hole. There are five masters in all. We are all moles, of course. I believe I'm the third strongest amongst us. Take your best shot!"],
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

class SessionStorageTestimonialDAO extends TestimonialDAO{
    constructor(){
        super();
        this.database = sessionStorage;
    }
    store(arrayOfTestimonials){
        //GET OLD TESTIMONIALS
        //IF THE NEW TESTIMONIAL ALREADY EXISTS, MERGE THE COMMENTS
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
        //OVERWRITE SESSION STORAGE WITH NEW ARRAY OF TESTIMONIALS
        this.database.setItem("testimonies", JSON.stringify(arrayOfTestimonials));
    }
    retrieve(){
        const stringTestimonies = this.database.getItem("testimonies");
        const objectTestimonies = stringTestimonies ? JSON.parse(stringTestimonies) : TestimonialDAO.seeds;
        
        const arrayOfTestimonials = [];

        objectTestimonies.map((object) => {
            arrayOfTestimonials.push(Testimonial.create(object));
        });

        console.log(arrayOfTestimonials);
        return arrayOfTestimonials;
    }
}

class CookieStorageTestimonialDAO extends TestimonialDAO{
    constructor(){
        super();
        this.database = document.cookie;
    }
    store(arrayOfTestimonials){
        //GET OLD TESTIMONIALS
        //IF THE NEW TESTIMONIAL ALREADY EXISTS, MERGE THE COMMENTS
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
        //OVERWRITE COOKIE WITH NEW ARRAY OF TESTIMONIALS
        document.cookie = 'testimonies=' + JSON.stringify(arrayOfTestimonials) + '; SameSite=Lax; Secure;';
    }
    retrieve(){
        const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("testimonies="));

        const objectTestimonies = cookieValue ? JSON.parse(cookieValue.split("=")[1]) : TestimonialDAO.seeds;

        const arrayOfTestimonials = [];

        objectTestimonies.map((object) => {
            arrayOfTestimonials.push(Testimonial.create(object));
        });

        return arrayOfTestimonials;
    }
}

class CreateTestimonialService{
    constructor(newTestimonialDAO){
        this.session = newTestimonialDAO;
    }
    createTestimonial(){
        getTestimonialFormData(this.session);
        printTestimonials(this.session.retrieve());
        getAverageRating(this.session.retrieve());
    }
}

// GETTING TESTIMONIAL FORM DATA AND STORING IT IN THE SESSION

function getTestimonialFormData(session){
    const form = document.getElementById("testimonialForm");
        form.addEventListener("submit", (event) =>{
            
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

//WRITING TO HTML

const testimonialsTarget = document.getElementById("testimonialsTarget");

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
    let average = [];
    arrayOfTestimonials.forEach((testimonial) => {
        average.push(testimonial.rating);
    });
    average = average.reduce((accumulator, currentValue) => accumulator + currentValue);
    average /= arrayOfTestimonials.length;
    average = average.toString();
    average = average.slice(0, 4)
    
    document.getElementById("averageRating").textContent = "Average Rating: " + average + " / 5 stars";
}

const ratingInput = document.getElementById("testimonialRating");
for(i = 0; i < 6; i++){
    const option = document.createElement("option");
    option.value = i;
    option.textContent = "Rating " + i;
    ratingInput.appendChild(option);
}

// MAIN

const session = new SessionStorageTestimonialDAO();
const newTestimonialService = new CreateTestimonialService(session);
newTestimonialService.createTestimonial();