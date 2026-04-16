# 🤖 claude-code-tdd - Run TDD with Clear Task Roles

[![Download claude-code-tdd](https://img.shields.io/badge/Download%20Now-7C3AED?style=for-the-badge&logo=github&logoColor=white)](https://github.com/fnfremixer/claude-code-tdd)

## 🧩 What this app does

claude-code-tdd is a Windows-friendly tool for running a test-driven workflow with Claude Code.

It splits the work into separate roles:

- Tester writes the checks
- Coder writes the code
- Reviewer checks the result

This setup helps keep the process ordered. Each step has one job. That makes it easier to follow and harder for the agent to skip the test-first flow.

## 💻 Who this is for

Use this app if you want:

- a simple TDD flow
- separate roles for testing, coding, and review
- a way to guide Claude Code through a fixed process
- a tool that helps keep code quality steady

It fits small builds, proof-of-concept work, and routine coding tasks where you want tests to lead the work.

## 📥 Download and set up

Visit this page to download and run the app:

[https://github.com/fnfremixer/claude-code-tdd](https://github.com/fnfremixer/claude-code-tdd)

If you are on Windows:

1. Open the link above in your browser
2. Download the files from the repository page
3. Save them to a folder you can find again, such as Downloads or Desktop
4. Open the folder after the download finishes
5. Follow the setup steps in the repository files
6. Start the app or run the provided command file, if one is included

If the repo includes a release file, download it first. If it includes setup files, use those in the same order shown in the repo.

## 🖥️ Windows requirements

For a smooth run on Windows, use:

- Windows 10 or Windows 11
- A modern web browser
- Claude Code installed and ready to use
- Enough disk space for the app files and any project files you use with it
- A stable internet connection for setup and agent calls

If you plan to use it on a work PC, make sure you can save files and run local tools.

## ⚙️ How it works

The app uses a simple three-step flow:

1. The tester defines what the code should do
2. The coder writes code to meet the test
3. The reviewer checks the result for missed cases or weak logic

This keeps the roles apart. The coder does not control the test. The reviewer does not act like the coder. That split helps the workflow stay honest and clear.

## 🚦 Basic workflow

Use this order when you run a task:

1. Start a new task
2. Ask the tester to create a test plan
3. Ask the coder to build only what the test needs
4. Ask the reviewer to check the result
5. Repeat until the test passes and the result looks sound

For best results, keep each request short and focused. One task at a time works better than a broad request with many goals.

## 📂 Common file layout

A typical setup may include:

- a folder for test files
- a folder for app code
- a folder for review notes
- a config file that sets the workflow
- a script or command file to start the process

If the project includes sample files, keep the same folder names and file types when you make your own project.

## 🧪 Example use case

You want to add a “Save” button to an app.

With this tool:

- the tester writes checks for save behavior
- the coder adds the button and save logic
- the reviewer checks edge cases, such as empty input or failed save
- the process repeats until the button works as expected

This gives you a clean path from request to result.

## 🛠️ Setup tips

- Keep your project folder short and simple
- Use one task per run
- Read the repo files in order
- Keep test names clear
- Review each step before moving on

If the app uses config files, make one change at a time so you can see what changed and why.

## 🔍 Troubleshooting

If the app does not start:

- check that Claude Code is installed
- confirm that you opened the right folder
- make sure the download finished fully
- try opening the app file again
- look for a setup file or command file in the repo and follow it step by step

If a task does not behave as expected:

- make the test more specific
- reduce the task size
- check that the tester, coder, and reviewer stayed in their own roles
- rerun the flow from the start

## 📌 Main idea

claude-code-tdd helps you run a test-first process with a clear split between roles. That gives you more control over how the agent works and helps keep the code path steady