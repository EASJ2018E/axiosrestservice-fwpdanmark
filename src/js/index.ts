import axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios/index";

interface IPerson {
    id: Number;
    firstName: string;
    lastName: string;
    year: string;   
} 

let buttonGet: HTMLButtonElement = document.getElementById("getAllButton") as HTMLButtonElement
buttonGet.addEventListener("click",getAllPersons);
let divtag: HTMLDivElement = document.getElementById("content") as HTMLDivElement
let uri :string = "https://restcustomerservicefwp.azurewebsites.net/api/customer";

function getAllPersons(): void{
   
   
    axios.get<IPerson[]>(uri)
    .then(function (responce: AxiosResponse<IPerson[]>):void{

        let result: string = "<ol>";
        responce.data.forEach((person: IPerson) => {
            if(person == null){
                result += "<li> Null element</li>"
            }
            else{
            result += "<li>"+ person.id+" " + person.firstName +" " +person.lastName +" "+person.year+ "</li>"
            }

        });
        result+= "</ol>"
        divtag.innerHTML = result;
    })
    .catch(function (error: AxiosError): void{
        divtag.innerHTML = error.message;
    })
}

let postButtonElement: HTMLButtonElement = document.getElementById("postButton") as HTMLButtonElement
postButtonElement.addEventListener("click",postPerson);

function postPerson(): void{
    let inputfieldID: HTMLInputElement = document.getElementById("inputID") as HTMLInputElement
    let inputfieldfirstName: HTMLInputElement = document.getElementById("inputfirstName") as HTMLInputElement
    let inputfieldlastName: HTMLInputElement = document.getElementById("inputlastName") as HTMLInputElement
    let inputfieldyear: HTMLInputElement = document.getElementById("inputyear") as HTMLInputElement

    let myId: Number = Number(inputfieldID.value);
    let myFirstName: string = inputfieldfirstName.value;
    let myLastName : string = inputfieldlastName.value;
    let myYear : string = inputfieldyear.value;

    axios.post<IPerson>(uri,{id: myId, firstName: myFirstName, lastName: myLastName, year: myYear})
    .then((response: AxiosResponse) => {console.log(response.status +" " + response.statusText)})
    .catch((error: AxiosError) => {console.log(error);} )
}

let deletePersonElement: HTMLButtonElement = document.getElementById("deleteButton") as HTMLButtonElement
deletePersonElement.addEventListener("click",deletePerson);

function deletePerson(): void{
    let deleteField: HTMLInputElement = document.getElementById("deleteID") as HTMLInputElement
    let newUri = "https://restcustomerservicefwp.azurewebsites.net/api/customer/"+deleteField.value;
    axios.delete(newUri)
    .then((response: AxiosResponse) => {console.log(response.status +" " + response.statusText)})
    .catch((error: AxiosError) => {console.log(error);} )
}

