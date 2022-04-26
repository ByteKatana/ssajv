/// <reference types="cypress" />

describe("== Job List Component Test ==", () => {
  before(() => {
    cy.visit("/")
  })

  it("Job List is visible", () => {
    cy.findByRole("table")
      .then(() => {
        return cy.findByRole("cell", {
          name: /syspolicy_purge_history/i
        })
      })
      .should("be.visible")
  })

  it("Activity List is visible", () => {
    cy.findByRole("cell", {
      name: /syspolicy_purge_history/i
    })
      .should("be.visible")
      .click()
    cy.findByRole("cell", {
      name: /\(job outcome\)/i
    })
      .should("be.visible")
      .click()
  })

  it("Job History is visible", () => {
    cy.findByRole("cell", {
      name: /30 \- purge history\./i
    }).should("be.visible")
  })

  it("Run Duration Trend Chart is visible", () => {
    cy.findByRole("tab", {
      name: /run duration trend chart/i
    }).click()
    cy.get("rect").should("be.visible")
  })
})
