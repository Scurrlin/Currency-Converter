import './style.css'
  
const currencyConverter = document.getElementById('currency_converter');
const baseCurrencyInput = document.getElementById('base_currency_input');
const baseCurrency = document.getElementById('currency');
const resultContainer = document.getElementById('result');
  
currencyConverter.addEventListener('submit', (e) => {
 e.preventDefault();
  
 fetch(`http://localhost:6001/convert?` + new URLSearchParams({ 'base_currency_input': baseCurrencyInput.value, 'currency': baseCurrency.value }))
   .then(response => response.json())
   .then(data => {
     var result = '<div class="space-y-1 px-5 py-3 border-2 rounded-md">';
     for (let entry of data) {
       result += `<div class="flex items-baseline justify-between"><span class="font-medium">${entry.code}:</span><span>${entry.value}</span></div>`;
     }
     resultContainer.innerHTML = result;
   });
});
