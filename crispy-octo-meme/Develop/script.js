


  $(document).ready(function () {
    // Function to update time blocks to indicate past, present, or future
    const updateBlocks = () => {
        const currentTime = moment().hour();

        $(".time-block").each(function () {
            const blockHour = parseInt($(this).data("hour"));
            const eventTextarea = $(this).find(".event");

            eventTextarea.removeClass("past present future");

            if (blockHour < currentTime) {
                eventTextarea.addClass("past");
            } else if (blockHour === currentTime) {
                eventTextarea.addClass("present");
            } else {
                eventTextarea.addClass("future");
            }
        });
    };

    // Function to load saved events from local storage and set textarea values
    const loadEvents = () => {
        $(".time-block").each(function () {
            const eventKey = $(this).data("event");
            const savedEvent = localStorage.getItem(eventKey);

            if (savedEvent) {
                $(this).find(".event").val(savedEvent);
            }
        });
    };

    // Function to display the current day at the top of the calendar
    const displayCurrentDate = () => {
        const currentDayElement = $("#currentDay");
        const currentDate = moment().format("dddd, MMMM Do");
        currentDayElement.text(currentDate);
    };

    // Function to save an event to local storage
    const saveEvent = () => {
        $(".save-btn").on("click", function () {
            const eventKey = $(this).data("save");
            const eventText = $(this).siblings(".event").val();
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
