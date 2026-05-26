package eventbus

import (
	"time"
)

// EventBus implements a deterministic event dispatch mechanism.
type EventBus struct {
	queue    *EventQueue
	registry *SubscriberRegistry
	tracer   *Tracer
}

func NewEventBus() *EventBus {
	return &EventBus{
		queue:    NewEventQueue(),
		registry: NewSubscriberRegistry(),
		tracer:   NewTracer(),
	}
}

// RegisterSubscriber adds a subscriber.
func (eb *EventBus) RegisterSubscriber(sub Subscriber) {
	eb.registry.Register(sub)
}

// GetEventQueue returns the underlying queue.
func (eb *EventBus) GetEventQueue() *EventQueue {
	return eb.queue
}

// Publish processes an event deterministically:
// 1. Assigns sequence number.
// 2. Appends to queue.
// 3. Dispatches synchronously to all subscribers in registration order.
// 4. Records trace.
func (eb *EventBus) Publish(event *BaseEvent) {
	// 1 & 2: Sequence and Append
	seq := eb.queue.Append(event)

	// 3: Synchronous Dispatch
	subscribers := eb.registry.GetSubscribers()
	executionTrace := make([]ResultMetadata, 0, len(subscribers))

	for _, sub := range subscribers {
		res, err := sub.Execute(event)
		
		errMsg := ""
		if err != nil {
			errMsg = err.Error()
		}

		executionTrace = append(executionTrace, ResultMetadata{
			SubscriberID: sub.ID(),
			Result:       res,
			Error:        errMsg,
		})
	}

	// 4: Trace
	eb.tracer.Record(TraceEntry{
		EventID:        event.EventID,
		SequenceNumber: seq,
		Timestamp:      time.Now(),
		ExecutionTrace: executionTrace,
	})
}
