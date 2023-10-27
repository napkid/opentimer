

interface TimerService {
    startTimer(duration: number): Promise<void>
    stopTimer(): Promise<void>
}