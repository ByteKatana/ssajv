/// <reference types="cypress" />

describe("== Weekly Schedule Calender Test ==", () => {
  before(() => {
    cy.visit("/")
  })

  it("Jobs are visible on calender", () => {
    for (let clickCounter = 0; clickCounter <= 6; clickCounter++) {
      cy.findByRole("button", {
        name: /previous week/i
      }).click()
    }
    cy.findByRole("row", {
      name: /02:00 syspolicy_purge_history/i
    }).should("be.visible")
  })
})
