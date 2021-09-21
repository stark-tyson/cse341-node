
const person = {
    name: 'Tyson', 
    age: 33, 
    greet(){
        console.log('Hello, I am ' + this.name)
    }
};

const { name, age } = person;
console.log(name, age);

setTimeout(() => {
    console.log('All done!');
}, 2000);



const hobbies = ['Guitar', 'Disc golf', 'Movies'];

const someArray = (...args) => {
    return args;
};

console.log(someArray(1, 4, 6, 'jet', 'sloth', true));
