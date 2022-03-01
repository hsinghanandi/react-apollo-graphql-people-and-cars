import { gql } from 'apollo-server'
import { find, remove, filter } from 'lodash'

const people = [
  {
    id: '1',
    firstName: 'Harman',
    lastName: 'Anandi',
  },
  {
    id: '2',
    firstName: 'John',
    lastName: 'Smith',
  },
  {
    id: '3',
    firstName: 'Jane',
    lastName: 'Doe',
  },
]

const cars = [
  {
    id: '1',
    make: 'Volkswagen',
    model: 'Polo GTI',
    year: '2017',
    price: '56000',
    personId: '1',
  },
  {
    id: '2',
    make: 'Hyundai',
    model: 'Verna',
    year: '2019',
    price: '31000',
    personId: '1',
  },
  {
    id: '3',
    make: 'Mazda',
    model: 'Mazda 3 Hatchback',
    year: '2021',
    price: '38000',
    personId: '2',
  },
  {
    id: '4',
    make: 'Kia',
    model: 'Sonnet',
    year: '2020',
    price: '19000',
    personId: '2',
  },
  {
    id: '5',
    make: 'Toyota',
    model: 'Fortuner',
    year: '2015',
    price: '28000',
    personId: '3',
  },
  {
    id: '6',
    make: 'Ford',
    model: 'Endeavour',
    year: '2021',
    price: '45000',
    personId: '3',
  },
]

const typeDefs = gql`
  type Person {
    id: String!
    firstName: String
    lastName: String
  }

  type Car {
    id: String!
    make: String
    model: String
    year: Int
    price: Float
    personId: String
  }

  type PersonWithCars {
    person: Person
    cars: [Car]
  }

  type Query {
    person(id: String!): Person
    people: [Person]
    car(id: String!): Car
    cars: [Car]
    personWithCar(id: String!): PersonWithCars
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): Person
    updatePerson(id: String!, firstName: String!, lastName: String!): Person
    removePerson(id: String!): Person
    addCar(
      id: String!
      make: String!
      model: String!
      year: Int!
      price: Float!
      personId: String!
    ): Car
    updateCar(
      id: String!
      make: String!
      model: String!
      year: Int!
      price: Float!
      personId: String!
    ): Car
    removeCar(id: String!): Car
  }
`

const resolvers = {
  Query: {
    person(root, args) {
      return find(people, { id: args.id })
    },
    people: () => people,
    car(root, args) {
      return find(cars, { id: args.id })
    },
    cars: () => cars,
    personWithCar(root, args) {
      const matchedCars = filter(cars, { personId: args.id })
      const person = find(people, { id: args.id })

      const peopleCarsObject = {
        person: person,
        cars: matchedCars,
      }

      return peopleCarsObject
    },
  },

  Mutation: {
    addPerson: (root, args) => {
      const newPersonObj = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      }

      people.push(newPersonObj)
      return newPersonObj
    },
    updatePerson: (root, args) => {
      const person = find(people, { id: args.id })
      if (!person) {
        throw new Error(`No one with an ID: ${args.id} has been found`)
      }

      person.firstName = args.firstName
      person.lastName = args.lastName

      return person
    },
    removePerson: (root, args) => {
      const removedPerson = find(people, { id: args.id })

      if (!removedPerson) {
        throw new Error(`No one with an ID: ${args.id} has been found`)
      }

      remove(people, (p) => {
        return p.id === removedPerson.id
      })

      remove(cars, (c) => {
        return c.personId === removedPerson.id
      })

      return removedPerson
    },

    addCar: (root, args) => {
      const newCarObj = {
        id: args.id,
        make: args.make,
        model: args.model,
        year: args.year,
        price: args.price,
        personId: args.personId,
      }

      cars.push(newCarObj)
      return newCarObj
    },
    updateCar: (root, args) => {
      const car = find(cars, { id: args.id })
      if (!car) {
        throw new Error(`The car with ID: ${args.id}could not be found `)
      }

      car.make = args.make
      car.model = args.model
      car.year = args.year
      car.price = args.price
      car.personId = args.personId

      return car
    },
    removeCar: (root, args) => {
      const removedCar = find(cars, { id: args.id })
      if (!removedCar) {
        throw new Error(`The car with ID: ${args.id}could not be found`)
      }

      remove(cars, (c) => {
        return c.id === removedCar.id
      })

      return removedCar
    },
  },
}

export { typeDefs, resolvers }
