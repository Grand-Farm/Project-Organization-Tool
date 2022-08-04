
# Grand Farm Program Management Office: Project Organization Tool

This project is for Grand Farm
Grand Farm is The Grand Farm Education and Research Initiative, powered by Emerging Prairie, capitalizes on the region’s potential and expertise in the agriculture and technology industries. The Grand Farm Initiative will accelerate the research and innovation into technology which will be present on the farm of the future – impacting North Dakota, the United States, and the World by solving challenges in the agriculture industry and developing new opportunities.
The Grand Farm Initiative is designed to inspire collaboration among businesses, organizations, and researchers to develop the future farm, which we believe will solve issues critical to farmers worldwide.

Grand Farm Management allows Grand Farm to add and view a partnered company’s allocated hours which are set at the start of a contractual period and states how many hours of employee time they can request from Grand Farm. After which the company is charged a prenegotiged rate per hour depending on the type of employee working. ie.(full time or intern)  It also has the ability to view a specific project and see all the activities(meetings,field work ect..) for that project. Furthermore Grand Farm is able to see the amount of hours and the type of employee associated with each activity. This application is business friendly, in that all the data are relatable to each other while also being separate and are navigable from one view to the another without hassle. All users are able to see all companies on log in.


## Tech Stack

**Client:** React, Redux, Redux-Saga, CSS,HTML,Javascript,Material UI

**Server:** Node, Express

**Database:** Postgres


## Usage/Examples

 ## Dahboard page
If a user is an admin they can log in and see who is subscurbied as a user to the app and have the ability to reset passwords for users and make users admins.
as admins they will also have the ability to see what companies are currently partnered with them, 
the rate they are charging for their services per full time employee and part time employee, 
as well as the ongoing and completed projects for each company inn a dashboard view.
![Screen Shot 2022-08-04 at 1 59 26 PM](https://user-images.githubusercontent.com/101376281/182932924-fc56de75-d937-4f8a-8533-85c7c872fdea.png)


## Partners Page

When a user navigates to this page they will see a list of companies thart are partnered with them and have ongoing projects.
A progress bar representing the amount of free hours remaining before a hourly rate is charged for projects given both as a precentage ex.(59%) beanathe the progress bar and as a fraction above it ex.(100/500).
A button will be displayed in the lower left beanthe the name of a company. this button is meant to be clicked if all projects asccoiated with that partner have been completed. 
Once this button is clicked it will no longer display the company on this page and archive it. If the arrow at the bottom right directly across from the arcive button is clicked it will show the date the partner signed the contract and how many projects the company has associated with it.
If the cursor moves by the name of the partner the backgound sourding the partner will turn light green and if it is clicked on will taked you to the projects page.
![Screen Shot 2022-08-04 at 1 58 35 PM](https://user-images.githubusercontent.com/101376281/182932827-c5d7361c-1642-4ac5-8be6-55e62d1fc36a.png)


## Projects Page

The projects page will display the company name in green if the company name is clicked on a drop down of all other companies will become aviable to choose another company to view thier projects.
Beanthe the comapny name is a option to view view hours if selected a user can see how many total hours they have spent working on all of a companies projects.
and how many of those hours are full time and intern. the user will also have the ability to add a new project form a button that if clicked will bring up a form asking for a projects name, budgeted hours, manager,and description.
the user will see all of the projects asccoiated with that comapany. below the name of the project is a description that has the details of the it hidden to view the details of the description a user clicks on the word description.
they will also see who is currently manaing that project, the estimated bugeted hours for that project, the status of the project that can be changed simply by clicking and selecting a new staus the aviable stauses tot choode from are initation,planning,exuction, monitor/control, and complete.
once complete is selected a form pops up to prompt the user to add an outcome top the project. once an outcome is added it becomes visible and has the details hidden unless a user wishes to view them and clicks on the word ooutcome to view them.
if the edit button is clicked a form pops up to alloow the user to edit any information on display for that project.
If the name of a comapny is clicked on it will move the user to the activities page.
![Screen Shot 2022-08-04 at 1 59 04 PM](https://user-images.githubusercontent.com/101376281/182932868-e6085e00-1ec6-4844-a26b-23b31ddffdf9.png)


## Activites Page

This page allows uers to see a grid of all the activites asociated with a project. if a user wants clicks the new activity Button a form will pop up prompting the user to add an activity name through a drop down table with the opotions
Training,innovation consulting, project meeting, internal meeting, external meeting, calls, emails, research, report, PM, misc, fieldTime, Stakeholder interview, observations
it will aslo promt for the name of the employees that worked on the project, full time and intern hours, notes and selcect a date by clicking the calander icon and selecting the approiate date. by double clicking a cell a user will have the option of editing the information contained within the cell.
![Screen Shot 2022-08-04 at 1 59 16 PM](https://user-images.githubusercontent.com/101376281/182932885-37259a70-fb51-4364-8534-17b8e5becb56.png)

## Archives Page 

This page will allow users to view all the comapnies than no longer have any on going projects associated with them.
They will. have the same view that the partner page with the same buttons and features with the exception of clicking the button to arc hive a company unarchives it and moves it back to the parnters page.
![Screen Shot 2022-08-04 at 2 06 12 PM](https://user-images.githubusercontent.com/101376281/182933132-b08bd361-d940-4490-871b-d6b461f58b26.png)


## Hosting Fees

## heroku
If you want you app to not take 30 seconds to spin up the first time someone goes to it, you will need to pay $7/month for a heroku dyno

If you want your app to hold 10,000 users (which might translate to a million rows of total SQL information) then you will need to pay $9/month for a million database rows
