const searchInput = document.getElementById('searchInput');
const shippingInput = document.getElementById('shippingInput');
const supplier = document.getElementById('supplier');
const percentage = document.getElementById('percentage');
const shipping = document.getElementById('shipping');


const calculateTotal = (matchingRows, e) => {
  let totalArr = [];
  for (i = 0; i < matchingRows.length; i++) {
    const row = matchingRows[i].split(",");
    const stringWithoutPercentage = row[1].slice(0, -1);
    const numericValue = parseFloat(stringWithoutPercentage);
    const enteredValue = parseFloat(e.target.value);
    const calcVal = enteredValue * numericValue / 100;

    totalArr.push(calcVal);
  }
  shipping.innerHTML = totalArr.join("<br>");
}

const displaySupplierInfo = (rows) => {
  const searchTerm = searchInput.value.toLowerCase();

  // Filter rows based on the search term
  const matchingRows = rows.filter(row => row.toLowerCase().includes(searchTerm));

  let splitArr = [];
  let nameArr = [];
  let percentageArr = [];

  for (let i = 0; i < matchingRows.length; i++) {

    const row = matchingRows[i].split(",");
    nameArr.push(row[0]);
    percentageArr.push(row[1]);
    splitArr.push(nameArr);
    splitArr.push(percentageArr);
  }

  // Display the matching rows
  supplier.innerHTML = splitArr[0].join("<br>");
  percentage.innerHTML = splitArr[1].join("<br>");

  return matchingRows;
}

const resetPriceInput = () => {
  shipping.innerHTML = "";
}

searchInput.addEventListener('input', function() {
  resetPriceInput();

  // URL to the raw CSV file in your repository
  const csvFileUrl = './postage.csv';

  fetch(csvFileUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(csvData => {
      const rows = csvData.split('\n'); // Split by newline to get rows
      const matchingRows = displaySupplierInfo(rows);

      // Work out shipping cost total
      shippingInput.addEventListener('input', function(e) {
        calculateTotal(matchingRows, e);

      })
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
});


