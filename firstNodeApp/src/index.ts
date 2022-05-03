//#region Example
    // interface User {
    //     email: string,
    //     username: string,
    //     password: string,
    //     registeredOn: Date
    // };

    // let user : User = {
    //     email: 'testemail@test.com',
    //     username: 'testusername',
    //     password: 'testpassword123',
    //     registeredOn: new Date()
    // };

    // console.log(`Welcome , ${user.username}!`);
//#endregion

import express, { Request, Response, Application } from 'express';

const app: Application = express(); 
const port = 8000;

app.listen(port, () => {
    console.log(`Server running ---> http://localhost:${port}`)
});


interface Person {
    name: string,
    lastname: string,
    age: number,
    id: number
};

let people: Array<Person> = [
    { name: 'Ray', lastname: 'Charles', age: 80, id: 1}, 
    { name: 'Dave', lastname: 'Mustaine', age: 57, id: 2 }, 
    { name: 'Marty', lastname: 'Friedman', age: 55, id: 3 }
];

app.get('/person/:id', (req: Request, res: Response) => {
    let id = +req.params.id;
    let person: Person | undefined = people.find(p => p.id === id);
    res.send(`The user is: ${JSON.stringify(person)}`);
});