/// <reference types="cypress" />

describe("== Last Outcome Filter Component Test", () => {
  before(() => {
    cy.visit("/")
  })

  it("Last Outcome Filter is visible", async () => {
    cy.findByText(/last outcome filter:/i)
    cy.findByTestId("last-outcome-btns")
      .within(() => {
        cy.get("#radio-0")
        cy.get("#radio-1")
        cy.get("#radio-2")
        cy.get("#radio-3")
        cy.get("#radio-4")
        cy.get("#radio-5")
        cy.get("#radio-6")
        return true
      })
      .should("be.visible")
  })

  it("All job button works", () => {
    cy.get("#radio-0").click({ force: true })
    cy.findByRole("cell", {
      name: /syspolicy_purge_history/i
    })
  })

  it("Succeeded button works", () => {
    cy.get("#radio-1").click({ force: true })
    cy.findByTestId("outcome-1")
  })

  it("Failed button works", () => {
    cy.get("#radio-2").click({ force: true })
    //TODO:"create sample data and uncomment the below"
    //cy.findByTestId("outcome-2")
  })

  it("Retry button works", () => {
    cy.get("#radio-3").click({ force: true })
    //cy.findByTestId("outcome-3")
  })

  it("Cancel button works", () => {
    cy.get("#radio-4").click({ force: true })
    //cy.findByTestId("outcome-4")
  })

  it("In Progress button works", () => {
    cy.get("#radio-5").click({ force: true })
    //cy.findByTestId("outcome-5")
  })

  it("Unknown button works", () => {
    cy.get("#radio-6").click({ force: true })
    //cy.findByTestId("outcome-6")
  })
})
