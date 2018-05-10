import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let employees = [
      {
        id: 1,
        name: "Ethel Price",
        gender: "female",
        company: "Johnson, Johnson and Partners, LLC CMP DDC",
        age: 22
      },
      {
        id: 2,
          name: "Claudine Neal",
          gender: "female",
          company: "Sealoud",
          age: 55
      },
      {
        id: 3,
          name: "Beryl Rice",
          gender: "female",
          company: "Velity",
          age: 67
      },
      {
        id: 4,
          name: "Wilder Gonzales",
          gender: "male",
          company: "Geekko",
          age:23
      },
      {
        id: 5,
          name: "Georgina Schultz",
          gender: "female",
          company: "Suretech",
          age: 27
      },
      {
        id: 6,
          name: "Carroll Buchanan",
          gender: "male",
          company: "Ecosys",
          age: 54
      },
      {
        id: 7,
          name: "Valarie Atkinson",
          gender: "female",
          company: "Hopeli",
          age: 51
      },
      {
        id: 8,
          name: "Schroeder Mathews",
          gender: "male",
          company: "Polarium",
          age: 28
      },
      {
        id: 9,
          name: "Lynda Mendoza",
          gender: "female",
          company: "Dogspa"
      },
      {
        id: 10,
          name: "Sarah Massey",
          gender: "female",
          company: "Bisba"
      },
      {
        id: 11,
          name: "Robles Boyle",
          gender: "male",
          company: "Comtract"
      },
      {
        id: 12,
          name: "Evans Hickman",
          gender: "male",
          company: "Parleynet"
      },
      {
        id: 13,
          name: "Dawson Barber",
          gender: "male",
          company: "Dymi"
      }
    ];
    return {employees};
  }
}