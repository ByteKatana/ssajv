/// <reference types="cypress" />

describe("== Statistic Page Test ==", () => {
  before(() => {
    cy.visit("/statistics")
  })

  it("Chart List is visible", () => {
    cy.findByRole("tab", {
      name: /top 10 job \- duration chart \(last 10 activity total duration\)/i
    }).should("be.visible")
    cy.findByRole("tab", {
      name: /top 10 job \- error chart \(last 10 activity total error\)/i
    }).should("be.visible")
  })

  it("Duration Chart is visible", () => {
    cy.findByRole("tab", {
      name: /top 10 job \- duration chart \(last 10 activity total duration\)/i
    }).click()
    cy.get("rect").should("be.visible")
  })

  it("Error Chart is visible", () => {
    cy.findByRole("tab", {
      name: /top 10 job \- error chart \(last 10 activity total error\)/i
    }).click()
    cy.get("rect").should("be.visible")
  })
})
