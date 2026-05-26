package eventbus

import (
	"sync"
)

// SubscriberRegistry maintains an ordered list of subscribers.
type SubscriberRegistry struct {
	mu          sync.RWMutex
	subscribers []Subscriber
}

func NewSubscriberRegistry() *SubscriberRegistry {
	return &SubscriberRegistry{
		subscribers: make([]Subscriber, 0),
	}
}

// Register adds a subscriber in the order it is called.
func (sr *SubscriberRegistry) Register(sub Subscriber) {
	sr.mu.Lock()
	defer sr.mu.Unlock()
	sr.subscribers = append(sr.subscribers, sub)
}

// GetSubscribers returns the ordered list of subscribers.
func (sr *SubscriberRegistry) GetSubscribers() []Subscriber {
	sr.mu.RLock()
	defer sr.mu.RUnlock()
	return sr.subscribers
}
