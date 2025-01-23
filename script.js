document.addEventListener("DOMContentLoaded", () => {
    const calendarTitle = document.getElementById("calendar-title");
    const calendar = document.getElementById("calendar");

    const today = new Date(); // Today's date
    let currentMonth = today.getMonth(); // Current month index
    let currentYear = today.getFullYear(); // Current year

    // Event dates: Add your events here (format: YYYY-MM-DD)
    const eventDates = ["2025-01-25", "2025-01-26", "2025-01-31"]; 

    // Update the calendar title dynamically
    function updateCalendarTitle() {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        calendarTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }

    // Generate the calendar
    function generateCalendar() {
        calendar.innerHTML = ""; // Clear previous calendar

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

        // Add blank cells before the first day
        for (let i = 0; i < firstDayOfWeek; i++) {
            const blankDay = document.createElement("div");
            blankDay.classList.add("day", "blank");
            calendar.appendChild(blankDay);
        }

        // Populate the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dateString = date.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD

            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.textContent = day;

            // Highlight today's date
            if (date.toDateString() === today.toDateString()) {
                dayElement.classList.add("current-day");
            }

            // Add a red dot for event days
            if (eventDates.includes(dateString)) {
                dayElement.classList.add("event-day");
            }

            calendar.appendChild(dayElement);
        }
    }

    // Add navigation for months with arrows
    function addNavigationButtons() {
        const prevButton = document.createElement("button");
        prevButton.innerHTML = "&lt;"; // Left arrow
        prevButton.classList.add("calendar-nav", "prev-button");
        prevButton.addEventListener("click", () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendarTitle();
            generateCalendar();
        });

        const nextButton = document.createElement("button");
        nextButton.innerHTML = "&gt;"; // Right arrow
        nextButton.classList.add("calendar-nav", "next-button");
        nextButton.addEventListener("click", () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendarTitle();
            generateCalendar();
        });

        // Add buttons to the calendar title container
        const titleContainer = calendarTitle.parentElement;
        titleContainer.insertBefore(prevButton, calendarTitle);
        titleContainer.appendChild(nextButton);
    }

    // Initialize the calendar
    updateCalendarTitle();
    generateCalendar();
    addNavigationButtons();
});
