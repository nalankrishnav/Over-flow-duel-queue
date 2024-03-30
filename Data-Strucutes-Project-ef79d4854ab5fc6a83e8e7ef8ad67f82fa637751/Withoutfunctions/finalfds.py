def size(front,rear):
    if rear== -1:
        return 0 
    elif rear >= front:
        return rear-front+1
    else:
        return N-(front-rear)+1
    

def isFull(front,rear):
    if size(front,rear) == N:
        return True
    else:
        return False

def isEmpty(front,rear):
    if rear==-1:
        return True
    else:
        return False



def enqueuecurrent(x):
    global front_current, rear_current
    if not isFull(front_current, rear_current):
        if rear_current==-1:
            front_current+=1
        rear_current=(rear_current+1)%N
        currentQueue[rear_current]=x
            
    else:
        print("Queue Full Exception")

def dequeuecurrent():
    global front_current, rear_current
    if not isEmpty (front_current, rear_current):
        x = currentQueue[front_current] 
        currentQueue[front_current] = None
        if front_current == rear_current:  #only one element left in the list
            front_current = - 1
            rear_current = - 1
        else:
            front_current = (front_current + 1) % N
        return (x)
    else:
        print("Queue Empty Exception")

def enqueueadditional(x):
    global front_additional, rear_additional
    if not isFull(front_additional, rear_additional):
        if rear_additional==-1:
            front_additional+=1
        rear_additional=(rear_additional+1)%N
        additionalQueue[rear_additional]=x
            
    else:
        print("Queue Full Exception")

def dequeueadditional():
    global front_additional, rear_additional
    if not isEmpty (front_additional, rear_additional):
        x= additionalQueue[front_additional] 
        additionalQueue[front_additional] = None
        if front_additional == rear_additional:  #only one element left in the list
            front_additional = - 1
            rear_additional = - 1
        else:
            front_additional = (front_additional + 1) % N
        return (x)
    else:
        print("Queue Empty Exception")


rear_current=-1
front_current=-1
rear_additional=-1
front_additional=-1
N = int(input("Enter the limit: "))
currentQueue=[None]*N
additionalQueue=[None]*N

while True:
    isfull_currentQueue = isFull(front_current,rear_current)
    isFull_additionalQueue = isFull(front_additional,rear_additional)
    isEmpty_currentQueue = isEmpty(front_current,rear_current)
    isEmpty_additionalQueue = isEmpty(front_additional,rear_additional)
    c = int(input(' 1.Enqueue\n 2.Dequeue\n 3.Clear\n Enter your choice: '))
    if c == 1:
        e = int(input("Enter a value"))
        if not isfull_currentQueue:
            enqueuecurrent(e)
            print(currentQueue,additionalQueue)
        else:
            if not isFull_additionalQueue:
                enqueueadditional(dequeuecurrent())
                enqueuecurrent(e)
                print(currentQueue,additionalQueue)
            else:
                print("Both queues full exception")


    elif c == 2:
        if not isEmpty_additionalQueue:
            dequeueadditional()
            print(currentQueue,additionalQueue)
        elif not isEmpty_currentQueue:
                dequeuecurrent()
                print(currentQueue,additionalQueue)

        else:
            print("QueueEmptyException")

    elif c == 3:
        currentQueue=[]
        additionalQueue=[]
        rear_current=-1
        front_current=-1
        rear_additional=-1
        front_additional=-1
        break 
    else:
        print("Invalid entry")



