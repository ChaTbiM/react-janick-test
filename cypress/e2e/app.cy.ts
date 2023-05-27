describe('Movie App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should only search in the selected category when filtering by category then searching by keywords', () => {
    cy.get(`[data-testid="category-Comedy"]`).check()
    cy.get('[data-testid="search"]').type('s')
    cy.get('[data-testid="movie"]').each((movieCard) => {
      cy.wrap(movieCard).should('contain.text', 'Comedy')
    })
  })

  it('should only filter in the search results when searching then filtering by category', () => {
    cy.get('[data-testid="search"]').type('g')
    cy.get(`[data-testid="category-Thriller"]`).check()
    cy.get('[data-testid="movie"]').each((movieCard) => {
      cy.wrap(movieCard).within(() => {
        cy.get('[data-testid="movie-title"]').should(
          'contain.text',
          'Gone Girl',
        )
        cy.get('[data-testid="movie-category"]').should(
          'contain.text',
          'Thriller',
        )
      })
    })
  })

  it('should be on page 1 when filtering by category and there is only one page of results', () => {
    // Select Animation Category that has 1 movie only
    cy.get(`[data-testid="category-Animation"]`).check()
    cy.get('[data-testid="current-page"]').should('contain.text', '1')
  })

  it('should retain the like on a movie when changing category', () => {
    // Select Animation Category that has 1 movie only with default of 3 likes ( we expect 4 likes)
    cy.get(`[data-testid="category-Animation"]`).check()

    // Like a movie
    cy.get('[data-testid="like-button"]').first().click()

    // Uncheck Selected category to view all movies
    cy.get('[data-testid="category-Animation"]').uncheck()

    cy.wait(2000) // make it clear that all movies are show on Cypress visual
    // Go back to the category of the liked movie
    cy.get('[data-testid="category-Animation"]').check()

    // Check that the movie still has the like displayed
    cy.get('[data-testid="movie"]').first().should('contain.text', '4')
  })

  it('should remove the category from filters and go back to "All movies" when deleting the last movie of a category', () => {
    cy.get('[data-testid="category-Animation"]').check()
    cy.get('[data-testid="delete-button"]').first().click()

    // check that Animation Category is not Available in filters list
    cy.get('[data-testid="category-Animation"]').should('not.exist')

    // Check that all other movies exists by toggling each category and count number of movies
    cy.get('[data-testid="category-Comedy"]').check()
    cy.get('[data-testid="movie"]').should('have.length', 2)
    cy.get('[data-testid="category-Comedy"]').uncheck()

    cy.get('[data-testid="category-Thriller"]').check()
    cy.get('[data-testid="movie"]').should('have.length', 5)
    cy.get('[data-testid="category-Thriller"]').uncheck()

    cy.get('[data-testid="category-Drama"]').check()
    cy.get('[data-testid="movie"]').should('have.length', 1)
    cy.get('[data-testid="category-Drama"]').uncheck()
  })
})

// Prevent TypeScript from reading file as legacy script
export {}
