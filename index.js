const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const connectDatabase = require("./database/database");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

dotenv.config();
connectDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Helmet with CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "data:", "https://cdnjs.cloudflare.com"],
        frameSrc: ["'self'", "https://www.youtube.com"],
        connectSrc: ["'self'", "https://api.asian.edu.np"],
        objectSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false, // Allow loading of cross-origin resources
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

app.use(mongoSanitize());
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
});
app.use("/api/", limiter);

// File Upload Configuration
app.use(
    fileUpload({
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
        useTempFiles: true,
        tempFileDir: "/tmp/",
        debug: process.env.NODE_ENV === "development",
        createParentPath: true,
        parseNested: true,
        safeFileNames: true,
        preserveExtension: true
    })
);

// Static files configuration
app.use(
    express.static("./public", {
        maxAge: "1d",
        setHeaders: (res, path) => {
            if (path.endsWith(".html")) {
                res.setHeader("Cache-Control", "no-cache");
            }
        },
    })
);

// Body parser configuration
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS configuration
const corsOptions = {
    origin: ["https://asian.edu.np"], // Allow both www and non-www
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin"
    ],
    credentials: true,
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Handle CORS preflight requests first
app.options("*", cors(corsOptions));

// Apply CORS middleware
app.use(cors(corsOptions));

// Add security headers
app.use((req, res, next) => {
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
});

// Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/slider", require("./routes/sliderRoutes"));
app.use("/api/event", require("./routes/eventRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/book", require("./routes/bookRoutes"));
app.use("/api/form", require("./routes/formRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    // Don't expose error details in production
    const response = process.env.NODE_ENV === "production"
        ? { success: false, message: "Internal Server Error" }
        : { success: false, message: err.message, stack: err.stack };

    res.status(err.status || 500).json(response);
});

// Handle 404s
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Resource not found" });
});

// Graceful shutdown handler
process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
        console.log("Process terminated");
    });
});

const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});