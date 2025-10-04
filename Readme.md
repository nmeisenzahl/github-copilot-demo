# Spec-driven development with GitHub

This repository shows how to use GitHub's issue tracking and project management features to drive software development through specifications. The project relies on [GitHub Spec Kit](https://github.com/github/spec-kit).

## The application

The goal is to build a simple tic tac toe browser game. The application will be built using a spec-driven approach, where each feature is defined by a specification before implementation.

## Spec kit installation

```bash

# Run specify init
specify init . --ai copilot

```

## Prompts for GH Copilot

``` markdown
/constitution This project is about building a modern Tic Tac Toe browser game using React. The implementation is guided by principles that emphasize code quality, maintainability, and simplicity. The user interface is designed to be modern, colorful, and accessible, providing an engaging experience for all users. All game logic and state management are handled entirely on the client side, with no server code or APIs involved, and dependencies are kept to a minimum, introduced only when absolutely necessary.

/specify The application features a classic Tic Tac Toe game where a human player competes against the computer. Players can choose between an easy and a hard difficulty mode for the computer opponent, allowing for both casual and more challenging gameplay. After a game concludes, whether by win or draw, a “Play Again” button is presented, returning the user to the start screen where they can toggle the difficulty and begin a new match. The entire application is implemented as a static web app, relying solely on React for UI and logic. Comprehensive UI tests executed with Playwright to ensure robust and reliable user flows. The implementation is intentionally focused and robust, following principles for high-quality software development. This project is a proof of concept. The focus is solely on the application code. CI/CD, containerization, and deployment are intentionally out of scope and not addressed for now.

/clarify

/plan 

/task

/analyze

#create_issue with title "Implement Classic Tic Tac Toe Game" with the contents of #file:tasks.md.

```

## Review outcome

* Issue: https://github.com/nmeisenzahl/github-copilot-demo/issues/2
* Pull request: https://github.com/nmeisenzahl/github-copilot-demo/pull/3
