# Dynamic Calendar

Dynamic Calendar is a web application that allows users to manage their events in a calendar view. The application provides a user-friendly interface to add, edit, and delete events, with features to switch between months and view events for a selected day.

## Features

- **Calendar Grid**: a calendar grid for the current month with all days properly aligned.
- **Month Navigation**: Allows users to switch between months using "Previous" and "Next" buttons.
- **Add Events**: Adds event by clicking on a day.
- **Edit/Delete Events**: Edit or delete events from a selected day.
- **Event List**: Displays a list of all events for the selected day in a modal or side panel.
- **Persistence**: Uses `localStorage` or a simple in-memory data store to persist events between page refreshes.
- **Grid Display**: Displays days in a grid with clear separation for weekends and weekdays.
- **Highlighting**: Highlights the current day and selected day visually.
- **Month Transitions**: Automatically handles month transitions (e.g., from Jan 31 to Feb 1).
- **Prevent Overlapping Events**: Prevents overlapping events (e.g., two events at the same time).
- **Color Coding**: Implements color coding for events (e.g., work, personal, others).

## Installation

Follow these steps to install and run the application locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/dynamic-calendar.git
    cd dynamic-calendar
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm run dev
    ```

4. **Open the application**:
    Open your browser and navigate to the mentioned url to view the application.

## Usage

- **Navigate Months**: Use the "Previous" and "Next" buttons to switch between months.
- **Add Events**: Click on a day to add an event. Fill in the event details and save.
- **Edit/Delete Events**: Click on an event to edit or delete it.
- **View Events**: Click on a day to view the list of events for that day in the side panel.

## Technologies Used

- React
- Tailwind CSS
- Framer Motion
- LocalStorage

