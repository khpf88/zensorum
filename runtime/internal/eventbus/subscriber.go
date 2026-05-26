package eventbus

// Subscriber defines the interface for event consumers.
// Subscribers MUST be registered in strict order.
type Subscriber interface {
	ID() string
	Execute(event *BaseEvent) (map[string]interface{}, error)
}

// ResultMetadata holds execution results for trace logging.
type ResultMetadata struct {
	SubscriberID string                 `json:"subscriber_id"`
	Result       map[string]interface{} `json:"result"`
	Error        string                 `json:"error,omitempty"`
}
