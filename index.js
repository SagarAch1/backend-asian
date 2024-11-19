const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const fileUpload = require("express-fileupload")
const connectDatabase = require("./database/database")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const mongoSanitize = require("express-mongo-sanitize")
const hpp = require("hpp")

dotenv.config()
connectDatabase()

const app = express()
const PORT = process.env.PORT || 5000

// Security Middleware
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use("/api/", limiter)

// File Upload Configuration
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
    useTempFiles: true,
    tempFileDir: "/tmp/",
    debug: process.env.NODE_ENV === "development",
  })
)

// Static files configuration
app.use(
  express.static("./public", {
    maxAge: "1d",
    setHeaders: (res, path) => {
      if (path.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache")
      }
    },
  })
)

// Body parser configuration
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// CORS Configuration
const corsOptions = {
  origin: ["https://asian.edu.np", "https://www.asian.edu.np"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // CORS preflight cache 24 hours
}
app.use(cors(corsOptions))

// Routes
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/contact", require("./routes/contactRoutes"))
app.use("/api/slider", require("./routes/sliderRoutes"))
app.use("/api/event", require("./routes/eventRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"))
app.use("/api/book", require("./routes/bookRoutes"))
app.use("/api/form", require("./routes/formRoutes"))
app.use("/api/news", require("./routes/newsRoutes"))
app.use("/api/gallery", require("./routes/galleryRoutes"))

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)

  // Don't expose error details in production
  const response =
    process.env.NODE_ENV === "production"
      ? { message: "Internal Server Error" }
      : { message: err.message, stack: err.stack }

  res.status(err.status || 500).json(response)
})

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" })
})

// Graceful shutdown handler
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...")
  server.close(() => {
    console.log("Process terminated")
  })
})

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
