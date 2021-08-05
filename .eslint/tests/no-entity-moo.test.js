const ruleTester = require("@sap/eslint-plugin-cds/lib/ruleFactory").getRuleTester();
const rule = require("../rules/no-entity-moo");

ruleTester.run("no-entity-moo", rule, {
  valid: [
    {
      code: `namespace my.bookshop;
entity Books {
  key ID : Integer;
  title  : String;
  stock  : Integer;
}`,
      filename: "books.cds",
    },
  ],

  invalid: [
    {
      code: `namespace my.bookshop;
entity Moo {
  key ID : Integer;
}`,
      errors: [{ message: "Entity 'Moo' not allowed!" }],
      output: `namespace my.bookshop;
entity Moon {
  key ID : Integer;
}`,
      filename: "books.cds",
    },
  ],
});
