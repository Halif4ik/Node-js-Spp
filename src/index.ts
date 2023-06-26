/*const express = require('express')*/
import express, {Request, Response} from 'express'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
// 1.
    function getFirstWord(a: string): number {
        const tempStr = a.split(/ +/)[1];
        return tempStr.length;
    }

    const firstTask: number = getFirstWord('express + node');

// 2.
    interface IUser {
        name: string
        surname: string
    }

    interface IExtUser {
        fullname?: string
        initials?: string
    }

    function getUserNamings(a: IUser): IExtUser {
        /*  const newPerson: ExtUser = {
              fullname: a.name + " " + a.surname,
              initials: a.name[0] + "." + a.surname[0]
          };
          return newPerson;*/
        return <IExtUser>{
            fullname: a.name + " " + a.surname,
            initials: a.name[0] + "." + a.surname[0]
        } as IExtUser;
    }

    const iam: IUser = {
        name: "Dmytro",
        surname: "Hrymach"
    }
    const secondTask: IExtUser = getUserNamings(iam);

// 3. <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
    const youAre: IUser = {
        name: "Jon",
        surname: "Dou"
    }

    interface IFeed {
        products?: IUser[]
        describe?: string[]
    }

    const thirdTask: (string | undefined)[] = getAllProductNames(<IFeed>{
        products: [iam, youAre],
        describe: ['iam', 'youAre']
    });

    function getAllProductNames(a: IFeed): (string | undefined)[] {
        return a?.products?.map(prod => prod?.name) || [];
    }

// 4.1 easy way is using 'as' keyword  hard way is ?...
    interface IRoma {
        coolness?: number
        cuteness?: number
        name: () => string
    }

    function heySec(a: IRoma): string {
        return "hey! i'm " + a.name();
    }

    const one: string = heySec(<IRoma>{
        name: function () {
            return "roma";
        },
        cuteness: 100
    });
    const two: string = heySec({name: () => "vasya", coolness: 100} as IRoma);

    const fourTaskOne: string = `fourTaskOne ${one}  ${two}`;

// 4.2
    class Animal {
        nameValue: string
        isDead?: boolean
        age?: number

        name() {
            return this.nameValue
        }

        constructor(name: string, secValue: (boolean | number)) {
            this.nameValue = name;
            if (typeof secValue === 'boolean') this.isDead = secValue;
            else this.age = secValue
        }
    }

    class Cat extends Animal {
    }

    class Dog extends Animal {
    }

    function hey(abstractPet: Animal): string {
        return "hey! i'm " + abstractPet.name();
    }

    let a = new Cat("myavchik", true)
    let b = new Dog("gavchik", 333)

    const once: string = hey(a)
    const twice: string = hey(b)

    const fourTaskSecond: string = `fourTaskTWO ${once}  ${twice}`;

// 4.3
    interface IRomaSec {
        type?: string
        coolness?: number
        cuteness?: number
        name: () => string
    }

    function heyFour(a: IRomaSec): string {
        return "hey! i'm " + a.name()
            + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness))
    }

    const once2: string = heyFour(<IRomaSec>{name: () => "roma", type: "cat", cuteness: 100})
    const two2: string = heyFour(<IRomaSec>{name: () => "vasya", type: "dog", coolness: 100})

    const fourTaskThird: string = `4fourTaskTWO ${once2} -- ${two2}`;


// 5.  google for Record type
    const arrExm: Array<string> = ['Dmitro', 'yes', '34'];
    const objExm = <Animal>{
        nameValue: 'Dmitro',
        isDead: 'yes',
        age: '34',
    };

    function stringEntries(a: (string[] | Animal)): string[] {
        return Array.isArray(a) ? a : Object.keys(a)
    }

    let resultFiveOne: string = '';
    stringEntries(arrExm).forEach(function (oneKey) {
        resultFiveOne += oneKey + '**';
    });
    let resultFiveTwo: string = '';
    stringEntries(objExm).forEach(function (oneKey) {
        resultFiveTwo += oneKey + '**';
    });
    const fiveTask: string = `5fiveTask ${resultFiveOne} --- ${resultFiveTwo}`;

    /*
    // 6.
    // you don't know Promises and async/await yet. Or do you? can be hard, don't worry and SKIP if you do not know how to do it

        async function world(a) {
            return "*".repeat(a)
        }

        const hello = async () => {
            return await world(10)
        }

        hello().then(function (r) {
            return console.log(r)
        }).catch(e => console.log("fail"));*/


    /*-------*/
    res.send([firstTask, secondTask, thirdTask, fourTaskOne, fourTaskSecond, fourTaskThird, fiveTask]);

})

app.listen(port, () => {
    console.log(`Example MYapp listening on port ${port}`)
})

