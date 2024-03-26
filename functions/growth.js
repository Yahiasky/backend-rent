function sortDatesAscending(dates) {
    // Copy the array to avoid mutating the original
    var sortedDates = dates.slice();
    // Use the sort method with a custom comparator
    sortedDates.sort(function(a, b) {
      // Convert the strings to Date objects
      var dateA = new Date(a);
      var dateB = new Date(b);
      // Subtract the dates and return the result
      return dateA - dateB;
    });
    // Return the sorted array
    return sortedDates;
  }
  
  // A function to compare dates
  function compareDates(date1, date2) {
    // Convert the dates to milliseconds
    var ms1 = new Date(date1).getTime();
    var ms2 = new Date(date2).getTime();
    // Return the difference in milliseconds
    return ms1 - ms2;
  }
  
  // A function to get the last 5 months from a given date
  function getLast5Months(date) {
    // Create a new date object with the same year and month as the given date
    var lastMonth = new Date(date.getFullYear(), date.getMonth());
    // Subtract 5 months from the last month
    lastMonth.setMonth(lastMonth.getMonth() - 5);
    // Return the last month as a string in the format 'yyyy/mm'
    return lastMonth.toISOString().slice(0, 7);
  }
  
  // A function to filter the users by the last 5 months
  function filterByLast5Months(users, date) {
    // Get the last 5 months from the given date
    var last5Months = getLast5Months(date);
    // Filter the users by comparing their joinedDate with the last 5 months
    return users.filter(user => compareDates(user.joinedDate, last5Months) >= 0);
  }
  
  // A function to count the number of users by month
  function countByMonth(users) {
    // Map the users to their month of joining
    var months = users.map(user => user.joinedDate.slice(0, 7));
    // Reduce the months to an array with the month as the first element and the count as the second element
    var counts = months.reduce((arr, month) => {
      // Find the index of the month in the array
      var index = arr.findIndex(elem => elem[0] === month);
      // If the month is already in the array, increment the count
      if (index !== -1) {
        arr[index][1]++;
      // Otherwise, push the month and the count as a new element
      } else {
        arr.push([month, 1]);
      }
      // Return the updated array
      return arr;
    }, []);
    // Return the counts array
    return counts;
  }
  
  // A function to count the number of users between two consecutive months
  function countBetweenMonths(users) {
    // Sort the users by their joinedDate in ascending order
    var sortedUsers = users.sort((a, b) => compareDates(a.joinedDate, b.joinedDate));
    // Initialize an empty array for the counts
    var counts = [];
    // Loop through the sorted users from the second one to the last one
    for (var i = 1; i < sortedUsers.length; i++) {
      // Get the current user and the previous user
      var currentUser = sortedUsers[i];
      var previousUser = sortedUsers[i - 1];
      // Get the month of the current user and the previous user
      var currentMonth = currentUser.joinedDate.slice(0, 7);
      var previousMonth = previousUser.joinedDate.slice(0, 7);
      // If the month is different, push the count as a new element
      if (currentMonth !== previousMonth) {
        counts.push(i);
      }
    }
    // Push the last count as the final element
    counts.push(sortedUsers.length);
    // Return the counts array
    return counts;
  }
  
  // A function to create two tables from the users table
  function createTwoTables(users, date) {
    // Filter the users by the last 5 months
    var filteredUsers = filterByLast5Months(users, date);
    // Count the number of users by month
    var countedUsersByMonth = countByMonth(filteredUsers);
    // Count the number of users between two consecutive months
    var countedUsersBetweenMonths = countBetweenMonths(filteredUsers);
    // Return the two tables as an array
    return [sortDatesAscending(countedUsersByMonth.map(e=>e[0])), countedUsersBetweenMonths];
  }
  
module.exports={createTwoTables}
 