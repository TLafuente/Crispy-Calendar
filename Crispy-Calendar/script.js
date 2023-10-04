(document).ready(function () {
    // Function to update time blocks to indicate past, present, or future
    const updateBlocks = () => {
        const currentTime = moment().format("HH:mm"); // Use HH:mm format for current time

        $(".time-block").each(function () {
            const blockHour = moment($(this).data("hour"), "HH:mm"); // Parse the block hour
            const eventTextarea = $(this).find(".description"); // Correct class name for description textarea

            eventTextarea.removeClass("past present future");

            if (blockHour.isBefore(currentTime, "HH:mm")) {
                eventTextarea.addClass("past");
            } else if (blockHour.isSame(currentTime, "HH:mm")) {
                eventTextarea.addClass("present");
            } else {
                eventTextarea.addClass("future");
            }
        });
    };

    // Function to load saved events from local storage and set textarea values
    const loadEvents = () => {
        $(".time-block").each(function () {
            const eventKey = $(this).attr("id"); // Use the block's id as the eventKey
            const savedEvent = localStorage.getItem(eventKey);

            if (savedEvent) {
                $(this).find(".description").val(savedEvent); // Correct class name for description textarea
            }
        });
    };

    // Function to display the current day at the top of the calendar
    const displayCurrentDate = () => {
        const currentDayElement = $("#currentDay");
        const currentDate = moment().format("dddd, MMMM Do, YYYY"); // Include year
        currentDayElement.text(currentDate);
    };

    // Function to save an event to local storage
    const saveEvent = () => {
        $(".saveBtn").on("click", function () { // Correct class name for save button
            const eventKey = $(this).parent().attr("id"); // Use the parent's id as the eventKey
            const eventText = $(this).siblings(".description").val(); // Correct class name for description textarea
            localStorage.setItem(eventKey, eventText);
        });
    };

    // Periodically update time blocks
    setInterval(updateBlocks, 60000); // Update every minute

    // Initial setup
    displayCurrentDate();
    updateBlocks();
    loadEvents();
    saveEvent();
});