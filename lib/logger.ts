type LogLevel = "debug" | "info" | "warn" | "error"

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: any
}

class Logger {
  private logs: LogEntry[] = []
  private maxLogs = 1000
  private isProduction: boolean = process.env.NODE_ENV === "production"

  constructor() {
    // Initialize with timestamp
    this.info("Logger initialized")
  }

  private log(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    }

    // Add to in-memory logs
    this.logs.push(entry)

    // Trim logs if they exceed max size
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }

    // Console output (except debug logs in production)
    if (!(level === "debug" && this.isProduction)) {
      const consoleMethod = level === "debug" ? "log" : level
      if (data) {
        console[consoleMethod as keyof Console](`[${level.toUpperCase()}] ${message}`, data)
      } else {
        console[consoleMethod as keyof Console](`[${level.toUpperCase()}] ${message}`)
      }
    }

    // In a real app, we might send critical logs to a monitoring service
    if (level === "error" && this.isProduction) {
      this.sendToMonitoring(entry)
    }
  }

  debug(message: string, data?: any) {
    this.log("debug", message, data)
  }

  info(message: string, data?: any) {
    this.log("info", message, data)
  }

  warn(message: string, data?: any) {
    this.log("warn", message, data)
  }

  error(message: string, data?: any) {
    this.log("error", message, data)
  }

  getLogs(level?: LogLevel, limit = 100) {
    if (level) {
      return this.logs.filter((log) => log.level === level).slice(-limit)
    }
    return this.logs.slice(-limit)
  }

  private sendToMonitoring(entry: LogEntry) {
    // In a real app, this would send the log to a monitoring service like Sentry
    // For now, we'll just simulate it
    if (typeof window !== "undefined") {
      // Browser-side logging
      try {
        localStorage.setItem("lastError", JSON.stringify(entry))
      } catch (e) {
        // Ignore storage errors
      }
    }
  }
}

// Create a singleton instance
const logger = new Logger()

export default logger

