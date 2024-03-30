document.addEventListener('DOMContentLoaded', function() {
    const queueForm = document.getElementById('queueForm');
    const limitInput = document.getElementById('limit');
    const choiceInput = document.getElementById('choice');
    const valueInput = document.getElementById('value');
    const resultContainer = document.getElementById('resultContainer');
    
    let n, currentQueue, additionalQueue;
    
    queueForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if (choiceInput.value === '1') {
        if (currentQueue.length < n) {
          currentQueue.push(parseInt(valueInput.value));
          displayQueues();
        } else {
          if (additionalQueue.length < n) {
            additionalQueue.push(currentQueue.shift());
            currentQueue.push(parseInt(valueInput.value));
            displayQueues();
          } else {
            resultContainer.textContent = 'Both queues full exception';
          }
        }
      } else if (choiceInput.value === '2') {
        if (currentQueue.length > 0) {
          currentQueue.shift();
          if (currentQueue.length === n - 1 && additionalQueue.length > 0) {
            currentQueue.unshift(additionalQueue.shift());
          }
          displayQueues();
        } else {
          resultContainer.textContent = 'QueueEmptyException';
        }
      } else if (choiceInput.value === '3') {
        resultContainer.textContent = 'Program exited.';
      } else {
        resultContainer.textContent = 'Invalid entry';
      }
      
      valueInput.value = '';
    });
    
    function displayQueues() {
      resultContainer.innerHTML = `
        <p>Current Queue: ${currentQueue}</p>
        <p>Additional Queue: ${additionalQueue}</p>
      `;
    }
    
    limitInput.addEventListener('input', function() {
      n = parseInt(limitInput.value);
      currentQueue = [];
      additionalQueue = [];
      resultContainer.textContent = '';
    });
  });
  