# SQL SERVER Agent Job Viewer
a REST API and UI for SQL Server Agent Jobs with Express and React

## Installation

### 1. API Server Installation
  1. Change directory to webapi folder and install packages with `npm install` command.
  2. Change name of `.env.example` file to ` .env ` and edit .env file to set api server port, database and web ui information.
  3. Start server with "npm start" (for development mode "npm run dev").
  4. If everything is correct, on console, you will get messages as follows:
     ```
     Server is running on Port:[PORT_NUMBER]
      DB Connection Successfull!
     ```
  5.If you get these messages, you can try on your browser to connect the API server with available api server routes.
  
### 2. WebUI Installation
  1. Change directory to webui folder and install packages with `npm install` or `yarn install` command.
  2. By default logo is react's own logo, if you want to change it, you replace `logo192.png` file in /webui/public directory.
  3. By default, port is 3001, if you want change this, in Windows `SET PORT=[PORT_NUMBER]` and in linux "export `PORT=[PORT_NUMBER]` command will change port number.  But if you change the port, you have build the application again for production mode with `npm build` or `yarn build` command.
  4. Start server with `serve -s build` (or for development mode `npm start` or `yarn start`) command
  
  ## API Server Routes
  | Route | Description |
  | ------------- | ------------- |
  | /api/jobs | returns all jobs from sysjob table |
  | /api/jobs/details | returns all jobs with their activity, history, steps, servers, schedules data |
  | /api/job/:id | returns only job data from sysjob table by job_id ( :id part of url should be replaced with job_id ) |
  | /api/job/:id/details | returns selected job by job_id and its activity, history, steps, servers, schedules data |
  | /api/steps | returns all steps data from sysjobsteps table |
  | /api/activity | returns all activity data from sysjobactivity table |
  | /api/schedules | returns all schedule data from sysjobschedules table |
  | /api/schedules/details | returns all schedule data with related job data(by job_id) from sysjobschedules and sysjob table |
  | /api/history | returns all history data from sysjobhistory table |
  | /api/servers | returns all server data from sysjobservers table |
  
  ## License
  This is an open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
  
  ## Dependencies
  
   ### WebUI
   * [React](https://github.com/facebook/react)
   * [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)
   * [react-router](https://github.com/ReactTraining/react-router)
   * [react-icons](https://github.com/react-icons/react-icons)
   * [bootswatch](https://github.com/thomaspark/bootswatch)
   * [FullCalender](https://github.com/fullcalendar/fullcalendar)
   * [nivo](https://github.com/plouc/nivo)
   * [Moment.js](https://github.com/moment/moment)
   * [react-moment](https://github.com/headzoo/react-moment)
   * [css-loaders](https://github.com/lukehaas/css-loaders)
   
   ### WebAPI
   * [Express](https://github.com/expressjs/express)
   * [helmet](https://github.com/helmetjs/helmet)
   * [node-mssql](https://github.com/tediousjs/node-mssql)
   * [nodemon](https://github.com/remy/nodemon/)
   * [dotenv](https://github.com/motdotla/dotenv)
   
   ### General
   * [Lodash](https://github.com/lodash/lodash)
   
