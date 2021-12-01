# Weightlifting Tracker
A web application that allows users to calculate their estimated one-rep maxes for weightlifting. Users can create an account to track their progress over time for any number of lifts. A graph is displayed for each lift to visualize the progress that has been made.

## Requirements
Node and npm must be installed to use this project.

## Screenshots
<img width="1393" alt="Screen Shot 2021-12-01 at 5 41 51 PM" src="https://user-images.githubusercontent.com/32973242/144326081-e02742e9-6101-4ff7-97f0-eee1f6b74c62.png">

## How to Use
This repository contains both the client and the server. Begin by entering the server directory and running the following command to start the server:

```bash
npm start
```

Then, enter the client directory and run the same command to start the client:

```bash
npm start
```

The client should open in your default web browser. To use the application, begin by creating an account. After your account is created, you will automatically be logged in. Add a lift by clicking or tapping the "Add Lift" button in the bottom right and entering the name of the lift. To add a data point to a lift, begin by entering the weight and number of reps done at the top of the screen. After calculating the estimated one-rep max, you'll have to opportunity to save that data to any lift after selecting the correct date.

The names of each lift can be modified by clicking the pencil at the top right of each card. This also allows you to delete a lift and all of its data points. The weight, number of reps, and date of any data point in any lift can be changed by clicking or tapping on the data point on the graph. Individual data points for a lift can also be deleted here. You may change the units or delete your account in the "My Account" panel, which is found next to the Log Out button.

## Built With

- Express
- Node
- React
- MongoDB
- JavaScript
