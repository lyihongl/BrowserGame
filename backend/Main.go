package main

import (
	"fmt"

	"./util"
)

func main() {
	fmt.Println(util.GenerateRoomKey(6))
	fmt.Println(util.GenerateRoomKey(6))
}
