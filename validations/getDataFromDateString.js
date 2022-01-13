const getDataFromDateString = (dateString) => (dateString ? new Date(dateString) : null);

const validateDatesFromParams = (startDateString, endDateString) => {
    const startDate = getDataFromDateString(startDateString);
    const endDate = getDataFromDateString(endDateString);
    if (startDate && endDate && startDate > endDate) {
        throw new Error('start date cannot be bigger then end date');
    }
    return [startDate, endDate];
};

module.exports = validateDatesFromParams;
