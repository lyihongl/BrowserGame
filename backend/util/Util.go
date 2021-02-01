package util

import (
	"math/rand"
	"time"
)

// GenerateRoomKey generates a 6 digit alpha-numeric key to be used for game rooms
func GenerateRoomKey(length int) string {
	rand.Seed(time.Now().UTC().UnixNano())
	key := make([]byte, length)
	for i := 0; i < 6; i++ {
		key[i] = byte('A' + rand.Intn(26))
	}
	return string(key)
}
