/// <reference types="cypress" />

describe("== SearchBox Component Test ==", () => {
  before(() => {
    cy.visit("/")
    //cy.intercept("http://localhost:3000/api/jobs/details").as("job_data")
  })
  it("Searchbox is visible", async () => {
    cy.findByRole("searchbox").should("be.visible")
  })

  it("Typing in searchbox", () => {
    cy.findByRole("searchbox").type("sys")
  })

  it("Getting results", () => {
    cy.findByRole("cell", {
      name: /syspolicy_purge_history/i
    })
  })
})
