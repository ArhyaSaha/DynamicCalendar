export function getMatrix(month = (new Date()).getMonth()) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    // Get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get the start day of the month
    const startDay = new Date(year, month, 1).getDay();

    let currentMonthCount = 0 - startDay;

    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return new Date(year, month, currentMonthCount);
        });
    });

    return daysMatrix;


}