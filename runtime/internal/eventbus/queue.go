package eventbus

import (
	"sync"
)

// EventQueue maintains the append-only log of events.
type EventQueue struct {
	mu      sync.RWMutex
	events  []*BaseEvent
	counter int64
}

func NewEventQueue() *EventQueue {
	return &EventQueue{
		events:  make([]*BaseEvent, 0),
		counter: 0,
	}
}

// Append adds an event and returns its deterministic sequence number.
// This is thread-safe to ensure atomicity of the sequence counter.
func (eq *EventQueue) Append(event *BaseEvent) int64 {
	eq.mu.Lock()
	defer eq.mu.Unlock()

	eq.counter++
	// In TS, sequence numbers might start from 1 or 0; following 1-based indexing for Go.
	// Ensure parity if needed.
	
	eq.events = append(eq.events, event)
	return eq.counter
}

// GetEvents returns the full log (for replay validation).
func (eq *EventQueue) GetEvents() []*BaseEvent {
	eq.mu.RLock()
	defer eq.mu.RUnlock()
	return eq.events
}

// GetSequenceCounter returns the current sequence number.
func (eq *EventQueue) GetSequenceCounter() int64 {
	eq.mu.RLock()
	defer eq.mu.RUnlock()
	return eq.counter
}
