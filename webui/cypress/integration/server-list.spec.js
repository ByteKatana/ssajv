/// <reference types="cypress" />

describe("== Server List Component Test ==", () => {
  before(() => {
    cy.visit("/")
  })

  it("Server list is visible", () => {
    cy.findByRole("listitem")
      .within(() => {
        return cy.findByText(/syspolicy_purge_history/i)
      })
      .should("be.visible")
  })
  it("Show jobs button for a specific server is working", () => {
    cy.findByTestId("server_jobs_btn").click()
    cy.findByRole("cell", {
      name: /syspolicy_purge_history/i
    })
  })

  it("Return all Job button is working", () => {
    cy.findByTestId("server_all_jobs_btn").click()
    cy.findByRole("cell", {
      name: /syspolicy_purge_history/i
    })
  })
})
