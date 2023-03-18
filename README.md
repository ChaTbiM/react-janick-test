# Thoughts/Ideas/Journal and progress

I am now at the first task , but I dont see how I am gonna structure this project yet because is still so simple (I might keep this simple architecture for simplicity ).
PS: To be honest I think we can avoid using Movie and MovieList component and we can put everything in corresponding page directly ( we ll see how it goes )

The main criteria that I have stumbled upon on my current role that would influence the architecture (folder structure / devinding responsabilities) is the following:

- Do I want this component/page/unit to work on itself (indepandent) or be fully dependant ? ===> this influences how to fetch data and how to manage state.

- so to answer the above i ll have to choose one of the scenarios ( this usually would be concluded by the help of the PM/client/CTO )

## Possible Scenarios

1. new startup/company/project
2. company has multiple projects whithing same industry and could benefit from sharing components

##

- I have decided to go with first scenario where the project is new because the second scenario itself has multiple possiblities and don't want to keep things simple

- Thats bieng said , my head says this is too small of project to demonstrate any architecture/structuring however I am gonna use modules folder structure

- movies module : should include all layers that are meant for a feature to function independently ( except shared components )
- However I am gonna through a button component in components folder as a sample of components that gonna be shared between many modules but these are components that are presentational/dumb components only , should not update any state nor fetch data

- I have choosen react-query as a tool to handle all of my server requests even though it has slightly more boilerplate but it is definetly an acceptable trade-off for decoupling (easier to rewrite this layer later) and laverage the caching capabilities of this tool.

- When I was trying to implement the popup that show after successfully deleting movie or on error , I tought about moving the functions responsible for that (onDeleteMovieErrorHandler, onDeleteMovieSuccessHandler) to queries.ts file but then I changed my mind because even though those are side effects only but it would more be more logical to give this responsibility to MovieList component also it would be predictable to find it there by other developers also it is the first and only child of this page ( home page that shows movies list).

# Requirements

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
