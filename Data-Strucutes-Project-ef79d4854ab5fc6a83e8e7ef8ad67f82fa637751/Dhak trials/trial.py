n=int(input("Enter the limit"));
currentQueue=[]
additionalQueue=[]
while True:
    c = int(input(' 1.Enqueue\n 2.Dequeue\n 3.Clear\n Enter your choice: '))
    if c == 1:
        if len(currentQueue) < n:
            currentQueue.append(int(input('Enter a value: ')))
            print(currentQueue,additionalQueue)
        else:
            if len(additionalQueue) < n:
                additionalQueue.append(currentQueue.pop(0))
                currentQueue.append(int(input('Enter a value: ')))
                print(currentQueue,additionalQueue)
            else:
                print("Both queues full exception")


    elif c == 2:
        if len(currentQueue)>0:
            currentQueue.pop(0)
            if len(currentQueue) == n-1 and len(additionalQueue) > 0:
                currentQueue.insert(additionalQueue.pop(0),0)
            print(currentQueue,additionalQueue)

        else:
            print("QueueEmptyException")

    elif c == 3:
        currentQueue=[]
        additionalQueue=[]
        break 
    else:
        print("Invalid entry")