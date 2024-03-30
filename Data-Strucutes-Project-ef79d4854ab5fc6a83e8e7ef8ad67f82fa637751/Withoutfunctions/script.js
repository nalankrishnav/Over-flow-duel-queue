document.addEventListener('DOMContentLoaded', function() {
  const queueForm = document.getElementById('queueForm');
  const limitInput = document.getElementById('limit');
  const valueInput = document.getElementById('value');
  const enqueueBtn = document.getElementById('enqueueBtn');
  const dequeueBtn = document.getElementById('dequeueBtn');
  const clearBtn = document.getElementById('clearBtn');
  const resultContainer = document.getElementById('resultContainer');
  
  let N, currentQueue, additionalQueue;
  let rear_current, front_current, rear_additional, front_additional;
  
  queueForm.addEventListener('submit', function(event) {
    event.preventDefault();
  });
  
  enqueueBtn.addEventListener('click', function() {
    const value = parseInt(valueInput.value);
    if (!isFull(front_current, rear_current)) {
      enqueueCurrent(value);
      displayQueues();
    } else {
      if (!isFull(front_additional, rear_additional)) {
        enqueueAdditional(dequeueCurrent());
        enqueueCurrent(value);
        displayQueues();
      } else {
        resultContainer.textContent = 'Both queues full exception';
      }
    }
    
    valueInput.value = '';
  });
  
  dequeueBtn.addEventListener('click', function() {
    if (!isEmpty(front_additional, rear_additional)) {
      dequeueAdditional();
      displayQueues();
    } else if (!isEmpty(front_current, rear_current)) {
      dequeueCurrent();
      displayQueues();
    } else {
      resultContainer.textContent = 'QueueEmptyException';
    }
  });
  
  clearBtn.addEventListener('click', function() {
    currentQueue = Array(N).fill(null);
    additionalQueue = Array(N).fill(null);
    rear_current = -1;
    front_current = -1;
    rear_additional = -1;
    front_additional = -1;
    displayQueues();
  });
  
  function size(front, rear) {
    if (rear === -1) {
      return 0;
    } else if (rear >= front) {
      return rear - front + 1;
    } else {
      return N - (front - rear) + 1;
    }
  }
  
  function isFull(front, rear) {
    return size(front, rear) === N;
  }
  
  function isEmpty(front, rear) {
    return rear === -1;
  }
  
  function enqueueCurrent(x) {
    if (!isFull(front_current, rear_current)) {
      if (rear_current === -1) {
        front_current += 1;
      }
      rear_current = (rear_current + 1) % N;
      currentQueue[rear_current] = x;
    } else {
      console.log("Queue Full Exception");
    }
  }
  
  function dequeueCurrent() {
    if (!isEmpty(front_current, rear_current)) {
      const x = currentQueue[front_current];
      currentQueue[front_current] = null;
      if (front_current === rear_current) {
        front_current = -1;
        rear_current = -1;
      } else {
        front_current = (front_current + 1) % N;
      }
      return x;
    } else {
      console.log("Queue Empty Exception");
    }
  }
  
  function enqueueAdditional(x) {
    if (!isFull(front_additional, rear_additional)) {
      if (rear_additional === -1) {
        front_additional += 1;
      }
      rear_additional = (rear_additional + 1) % N;
      additionalQueue[rear_additional] = x;
    } else {
      console.log("Queue Full Exception");
    }
  }
  
  function dequeueAdditional() {
    if (!isEmpty(front_additional, rear_additional)) {
      const x = additionalQueue[front_additional];
      additionalQueue[front_additional] = null;
      if (front_additional === rear_additional) {
        front_additional = -1;
        rear_additional = -1;
      } else {
        front_additional = (front_additional + 1) % N;
      }
      return x;
    } else {
      console.log("Queue Empty Exception");
    }
  }
  
  function displayQueues() {
    resultContainer.innerHTML = `
      <div>
        <p>Current Queue:</p>
        ${currentQueue.map(value => `<div class="array-box">${value !== null ? value : ''}</div>`).join('')}
      </div>
      <div>
        <p>Additional Queue:</p>
        ${additionalQueue.map(value => `<div class="array-box">${value !== null ? value : ''}</div>`).join('')}
      </div>
    `;
  }
  
  limitInput.addEventListener('input', function() {
    N = parseInt(limitInput.value);
    currentQueue = Array(N).fill(null);
    additionalQueue = Array(N).fill(null);
    rear_current = -1;
    front_current = -1;
    rear_additional = -1;
    front_additional = -1;
    resultContainer.textContent = '';
  });
});
