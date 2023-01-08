# C4T NextJS Interview

# How to complete the test

## ☑️ Instructions

1. Display the movies in cards side by side (responsive) and show:

   - Poster image
   - Title
   - Category

2. Add a button in each card to delete it

3. Add a like/dislike feature to each card

   - Display a toggle button for like and dislike
   - Display the number of likes and dislikes

4. Add a category filter

   - Use React Hook Form
   - This filter allows you to select a category to display
   - The categories must be retrieved dynamically from the movies list
   - If all the movies of a category are deleted, it should no longer appear

5. Add a pagination to the movies list

   - Display 6 movies per page
   - Add a previous & next button

6. Add a search field by movie title constrained by the selected category

   - Use React Hook Form to make the search field work

7. Add unit tests and test:

   - The filtering function
   - The search function
   - The like / dislike feature
   - The movie card component

8. Create e2e tests:
   - If we filter by category then search by keywords, we should only search in the selected category
   - If we search then filter by category, we should only filter in the search results
   - If we are on page 2 and we filter by category and there is only one page of results, we should be on page 1
   - If we like a movie then change category, the movie disappears, when we go back to the category of the liked movie, our like should still be displayed on the card
   - If we delete the last movie of a category, the category should disappear from the filters and be back to "All movies" category

### ✅ Conditions

- **Use TypeScript and type everything**
- **Use all the libraries that are provided in the project**
- **You can add any library you want to complete the test**
- Use Tailwind for the design
- Use Cypress and Jest for the tests (already provided and configured)
- You can add RecoilJS or Zustand or any other state management library you want
- **⚠️ Your code should demonstrate:**
  - Single Source of Truth principle
  - DRY principle
  - KISS principle
  - SOLID principle
  - SOC principle
  - LOD principle
- **⚠️ We will carefully assess how you structured your code and the project, imagine you're working within a team. Demonstrate how rigorous you are.**

**Good luck!** 💪

# Project Dependencies

## Core

- ✅ Next 13
- ✅ React 18
- ✅ Typescript 4

## UI

- ✅ TailwindCSS 3

## Testing

- ✅ Jest
- ✅ Cypress
- ✅ MSW

## Linting

- ✅ ESLint
- ✅ Prettier
- ✅ Stylelint
- ✅ Lint-staged
- ✅ Husky
- ✅ Commitlint
- ✅ Commitizen
- ✅ Conventional Commits

# Getting started

## Installation

```bash
$ yarn && yarn dev
```

---

## MSW

This project uses MSW to mock the API calls and will intercept requests made so you don't need to host any API locally.

You can get more information about MSW here: https://mswjs.io/

Use this URL to fetch the movies: `/movies`

---

## E2E tests

Create your e2e tests using Cypress to test the app from the user perspective.

Write tests for each feature you add.

See `./cypress/e2e` for the tests.

Run `yarn test:e2e:headless` to run the e2e tests.

---

## Unit tests

Create your unit tests in a **tests** folder alongside the component you want to test.

See `./src/pages/__tests__/index.test.tsx` for an example.

Run `yarn test` to run the unit tests.

---

## Committing

This project uses commitizen to generate commit messages.
Please, use `yarn cz` and follow the instructions to commit your changes.
