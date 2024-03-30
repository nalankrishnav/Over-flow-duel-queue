document.addEventListener('DOMContentLoaded', function() {
    const queueForm = document.getElementById('queueForm');
    const limitInput = document.getElementById('limit');
    const valueInput = document.getElementById('value');
    const enqueueBtn = document.getElementById('enqueueBtn');
    const dequeueBtn = document.getElementById('dequeueBtn');
    const exitBtn = document.getElementById('exitBtn');
    const resultContainer = document.getElementById('resultContainer');
    
    let n, currentQueue, additionalQueue;
    
    
    enqueueBtn.addEventListener('click', function() {
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
      
      valueInput.value = '';
    });
    
    dequeueBtn.addEventListener('click', function() {
      if (currentQueue.length > 0) {
        if (additionalQueue.length > 0) {
          additionalQueue.shift();
        }
        else{
          currentQueue.shift();
        }
        displayQueues();
      } else {
        resultContainer.textContent = 'QueueEmptyException';
      }
    });
    
    exitBtn.addEventListener('click', function() {
        currentQueue = [];
        additionalQueue = [];
        resultContainer.textContent = 'Values cleared.';
      });
    
    function displayQueues() {
      resultContainer.innerHTML = `
        <div style="text-align:center">
            <hr>
          <p style="font-family="Courier">Current Queue:</p>
          ${currentQueue.map(value => `<div class="array-box">${value}</div>`).join('')}
        </div>
        <div style="text-align:center">
          <p style="font-family="Courier">Additional Queue:</p>
          ${additionalQueue.map(value => `<div class="array-box">${value}</div>`).join('')}
        </div>
      `;
    }
    
    limitInput.addEventListener('input', function() {
      n = parseInt(limitInput.value);
      currentQueue = [];
      additionalQueue = [];
      resultContainer.textContent = '';
    });
  });
  