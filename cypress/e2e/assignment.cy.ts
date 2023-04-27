// [X] - For each page transition, validate the correct title (or any other page-specific requirement) is present.
// [X] - For each of the selectable pages, validate the amount of buttons.
// [X] - Validate the location under maintenance cannot be selected.
// [X] - For the countdown, intercept the POST-call and mock it with a shorter timer.

describe("Wash World Assignment", () => {
  it("contains 3 available locations", () => {
    cy.visit("http://localhost:3000/");

    cy.get("h2").should("contain.text", "Select a location");

    cy.get(".location-card").should("have.length", 4);
    cy.get(".location-card button").should("have.length", 3);
  });

  it("contains 4 washing programs", () => {
    cy.visit("http://localhost:3000/")
      .get(".location-card button")
      .first()
      .click();

    cy.get("h2").should("contain.text", "Select a product");
    cy.get(".program-card").should("have.length", 4);
  });

  it("starts and finishes a wash", () => {
    cy.visit("http://localhost:3000/")
      .get(".location-card button")
      .first()
      .click()
      .get(".program-card button")
      .first()
      .click();

    cy.get("h2").should("contain.text", "Ready to start the wash");

    cy.intercept(
      "POST",
      "https://b46f027d-3a5f-4de6-9075-5e861759e531.mock.pstmn.io/*/start/*",
      {
        statusCode: 200,
        status: "success",
        body: {
          http_code: 200,
          status: "success",
          response: {
            program: "Premium",
            estimated_duration: "0:05",
            location: 2,
          },
        },
      }
    ).as("startWash");

    cy.get("button.start-wash").click();

    cy.wait(7000).then(() => {
      cy.url().should("eq", "http://localhost:3000/");
    });
  });
});
