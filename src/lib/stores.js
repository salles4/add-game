import { writable } from "svelte/store";

export const endTime = writable(0)
export const finalScore = writable(0)
export const finalTime = writable("0")
export const running = writable(false)