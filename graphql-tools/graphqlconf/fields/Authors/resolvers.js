const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
];

const resolveFunctions = {
  Query: {
    authors() {
      return authors;
    }
  }
};

module.exports = resolveFunctions;