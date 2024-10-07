- Follow to those step to start the project

- Step 1: Open new Terminal -> Enter "cd server" -> "npm i" -> "npm start"
- Step 2: Open more another Terminal -> Enter "cd client" -> "npm i" -> "npm run dev"
- To start the Storybook, open more another Terminal -> "cd client" -> "npm run storybook"

* Additional Features:

- Pagination and Filter: You can use to choose rows showing per page and switch the page, integrate with API
- Bulk Edit: You can select tasks on the table. If the selected tasks have the same status, a button will appear below the table to perform bulk status update for these tasks.

* For example, if all selected tasks have the status "Completed", then below the table there will be an "Incomplete" button to perform bulk edit and vice versa. If the selected task includes multiple statuses, there will be no button to perform bulk edit.

- Export to excel: You can "export all tasks" (this will look at database to export all rows on the table of database to excel) or "export this page" to just export what are showing on the screen
- Add New Task and Edit Task: Validate form, integrate with API and implement loading when API are calling to improve UI/UX
- Search: You can search by task name and task status

Tech Stack:
Client: ReactJS, Typescript, RadixUI, Axios, Storybook, React Toastify
Server: NodeJS-ExpressJS, MongoDB

Additional: ESLint, Prettier, Vite
