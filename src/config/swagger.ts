import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chalets Booking API",
      version: "1.0.0",
      description:
        "A production-ready RESTful API for a chalet booking marketplace. Built with Node.js, TypeScript, and MongoDB.",
      contact: {
        name: "Shatha Abu Shammala",
        url: "https://github.com/Shatha-AbuShammala/chalets-booking-api",
      },
    },
    servers: [
      {
        url: "https://chalets-booking-api-production.up.railway.app",
        description: "Production Server (Railway)",
      },
      {
        url: "http://localhost:4000",
        description: "Local Development",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Enter your access token. Get it from /api/auth/login or /api/auth/register",
        },
      },
      schemas: {
        // ─── Auth ───────────────────────────────────────────────
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", minLength: 2, maxLength: 100, example: "Shatha Abu Shammala" },
            email: { type: "string", format: "email", example: "shatha@example.com" },
            password: { type: "string", minLength: 6, example: "password123" },
            role: {
              type: "string",
              enum: ["customer", "owner", "admin"],
              default: "customer",
              example: "customer",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "shatha@example.com" },
            password: { type: "string", example: "password123" },
          },
        },
        RefreshTokenRequest: {
          type: "object",
          required: ["refreshToken"],
          properties: {
            refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                  properties: {
                    id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
                    name: { type: "string", example: "Shatha Abu Shammala" },
                    email: { type: "string", example: "shatha@example.com" },
                    role: { type: "string", enum: ["customer", "owner", "admin"] },
                  },
                },
                accessToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
                refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
              },
            },
          },
        },
        // ─── Chalet ─────────────────────────────────────────────
        CreateChaletRequest: {
          type: "object",
          required: ["title", "description", "city", "pricePerNight", "capacity"],
          properties: {
            title: { type: "string", minLength: 3, example: "Mountain Retreat Chalet" },
            description: {
              type: "string",
              minLength: 10,
              example: "A luxurious chalet with stunning mountain views and private pool.",
            },
            city: { type: "string", example: "Nablus" },
            pricePerNight: { type: "number", minimum: 0, example: 250 },
            capacity: { type: "number", minimum: 1, example: 8 },
            amenities: {
              type: "array",
              items: { type: "string" },
              example: ["WiFi", "Pool", "BBQ", "Parking"],
            },
            images: {
              type: "array",
              items: { type: "string", format: "uri" },
              example: ["https://res.cloudinary.com/example/image/upload/chalet1.jpg"],
            },
          },
        },
        UpdateChaletRequest: {
          type: "object",
          properties: {
            title: { type: "string", minLength: 3 },
            description: { type: "string", minLength: 10 },
            city: { type: "string" },
            pricePerNight: { type: "number", minimum: 0 },
            capacity: { type: "number", minimum: 1 },
            amenities: { type: "array", items: { type: "string" } },
            images: { type: "array", items: { type: "string", format: "uri" } },
            isActive: { type: "boolean" },
          },
        },
        UpdateChaletStatusRequest: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "string",
              enum: ["approved", "rejected"],
              example: "approved",
            },
            rejectionReason: {
              type: "string",
              example: "Images do not meet quality standards",
            },
          },
        },
        Chalet: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            ownerId: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
            title: { type: "string", example: "Mountain Retreat Chalet" },
            description: { type: "string", example: "A luxurious chalet..." },
            city: { type: "string", example: "Nablus" },
            pricePerNight: { type: "number", example: 250 },
            capacity: { type: "number", example: 8 },
            amenities: { type: "array", items: { type: "string" }, example: ["WiFi", "Pool"] },
            images: { type: "array", items: { type: "string" } },
            status: { type: "string", enum: ["pending", "approved", "rejected"], example: "approved" },
            isActive: { type: "boolean", example: true },
            averageRating: { type: "number", example: 4.5 },
            reviewsCount: { type: "number", example: 12 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        // ─── Booking ────────────────────────────────────────────
        CreateBookingRequest: {
          type: "object",
          required: ["chaletId", "checkIn", "checkOut"],
          properties: {
            chaletId: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            checkIn: { type: "string", format: "date", example: "2025-07-01" },
            checkOut: { type: "string", format: "date", example: "2025-07-05" },
          },
        },
        Booking: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d3" },
            chaletId: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            userId: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
            checkIn: { type: "string", format: "date-time" },
            checkOut: { type: "string", format: "date-time" },
            totalPrice: { type: "number", example: 1000 },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "cancelled"],
              example: "confirmed",
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        // ─── Review ─────────────────────────────────────────────
        CreateReviewRequest: {
          type: "object",
          required: ["chaletId", "bookingId", "rating", "comment"],
          properties: {
            chaletId: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            bookingId: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d3" },
            rating: { type: "number", minimum: 1, maximum: 5, example: 5 },
            comment: {
              type: "string",
              minLength: 10,
              example: "Amazing experience! Stunning views and top-notch facilities.",
            },
          },
        },
        Review: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d4" },
            chaletId: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            userId: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
            bookingId: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d3" },
            rating: { type: "number", example: 5 },
            comment: { type: "string", example: "Amazing experience!" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        // ─── Common ─────────────────────────────────────────────
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "object" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                message: { type: "string", example: "Something went wrong" },
              },
            },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                message: { type: "string", example: "Validation failed" },
                details: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      field: { type: "string" },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    tags: [
      { name: "Auth", description: "Registration, login, token management" },
      { name: "Chalets", description: "Chalet listing, management, and admin approval" },
      { name: "Bookings", description: "Booking creation and management" },
      { name: "Reviews", description: "Chalet reviews and ratings" },
      { name: "System", description: "Health checks and system routes" },
    ],
    paths: {
      // ══════════════════════════════════════════════════════════
      // AUTH
      // ══════════════════════════════════════════════════════════
      "/api/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          description:
            "Creates a new account and returns JWT access & refresh tokens. Default role is `customer`.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterRequest" },
              },
            },
          },
          responses: {
            "201": {
              description: "User registered successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                },
              },
            },
            "400": {
              description: "Validation error or email already exists",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationError" },
                },
              },
            },
            "429": { description: "Rate limit exceeded (20 requests/minute)" },
          },
        },
      },
      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login with email and password",
          description: "Authenticates the user and returns JWT access & refresh tokens.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginRequest" },
              },
            },
          },
          responses: {
            "200": {
              description: "Login successful",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                },
              },
            },
            "400": { description: "Validation error" },
            "401": { description: "Invalid credentials" },
            "429": { description: "Rate limit exceeded" },
          },
        },
      },
      "/api/auth/refresh": {
        post: {
          tags: ["Auth"],
          summary: "Refresh access token",
          description:
            "Uses a valid refresh token to issue a new access token and rotate the refresh token.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RefreshTokenRequest" },
              },
            },
          },
          responses: {
            "200": {
              description: "Tokens refreshed successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          accessToken: { type: "string" },
                          refreshToken: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
            "401": { description: "Invalid or expired refresh token" },
          },
        },
      },
      "/api/auth/logout": {
        post: {
          tags: ["Auth"],
          summary: "Logout",
          description: "Invalidates the refresh token stored server-side. Requires authentication.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "Logged out successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: { message: { type: "string", example: "Logged out" } },
                      },
                    },
                  },
                },
              },
            },
            "401": { description: "Unauthorized" },
          },
        },
      },
      // ══════════════════════════════════════════════════════════
      // CHALETS
      // ══════════════════════════════════════════════════════════
      "/api/chalets": {
        get: {
          tags: ["Chalets"],
          summary: "List all approved chalets",
          description:
            "Returns a paginated list of approved, active chalets. Supports filtering by city, price range, and capacity.",
          parameters: [
            { name: "page", in: "query", schema: { type: "integer", default: 1 }, description: "Page number" },
            { name: "limit", in: "query", schema: { type: "integer", default: 10 }, description: "Results per page" },
            { name: "city", in: "query", schema: { type: "string" }, description: "Filter by city" },
            { name: "minPrice", in: "query", schema: { type: "number" }, description: "Minimum price per night" },
            { name: "maxPrice", in: "query", schema: { type: "number" }, description: "Maximum price per night" },
            { name: "capacity", in: "query", schema: { type: "integer" }, description: "Minimum guest capacity" },
          ],
          responses: {
            "200": {
              description: "List of chalets",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          chalets: { type: "array", items: { $ref: "#/components/schemas/Chalet" } },
                          total: { type: "number", example: 50 },
                          page: { type: "number", example: 1 },
                          pages: { type: "number", example: 5 },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Chalets"],
          summary: "Create a new chalet",
          description:
            "Creates a new chalet listing. Only accessible by users with the `owner` role. The chalet starts with `pending` status and requires admin approval.",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateChaletRequest" },
              },
            },
          },
          responses: {
            "201": {
              description: "Chalet created successfully (pending admin approval)",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/Chalet" },
                    },
                  },
                },
              },
            },
            "400": { description: "Validation error" },
            "401": { description: "Unauthorized" },
            "403": { description: "Forbidden — owner role required" },
          },
        },
      },
      "/api/chalets/my": {
        get: {
          tags: ["Chalets"],
          summary: "Get my chalets (Owner)",
          description: "Returns all chalets belonging to the authenticated owner.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "Owner's chalet list",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: { type: "array", items: { $ref: "#/components/schemas/Chalet" } },
                    },
                  },
                },
              },
            },
            "401": { description: "Unauthorized" },
            "403": { description: "Forbidden — owner role required" },
          },
        },
      },
      "/api/chalets/{id}": {
        get: {
          tags: ["Chalets"],
          summary: "Get a chalet by ID",
          description: "Returns the full details of a single chalet.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "MongoDB ObjectId of the chalet",
              example: "64f1a2b3c4d5e6f7a8b9c0d1",
            },
          ],
          responses: {
            "200": {
              description: "Chalet details",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: { $ref: "#/components/schemas/Chalet" },
                    },
                  },
                },
              },
            },
            "404": { description: "Chalet not found" },
          },
        },
        put: {
          tags: ["Chalets"],
          summary: "Update a chalet",
          description: "Updates a chalet listing. Only the owner of the chalet can update it.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateChaletRequest" },
              },
            },
          },
          responses: {
            "200": { description: "Chalet updated" },
            "401": { description: "Unauthorized" },
            "403": { description: "Forbidden" },
            "404": { description: "Chalet not found" },
          },
        },
        delete: {
          tags: ["Chalets"],
          summary: "Delete a chalet",
          description: "Soft-deletes a chalet. Only the owner can delete their own chalet.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": { description: "Chalet deleted" },
            "401": { description: "Unauthorized" },
            "403": { description: "Forbidden" },
            "404": { description: "Chalet not found" },
          },
        },
      },
      "/api/chalets/{id}/status": {
        patch: {
          tags: ["Chalets"],
          summary: "Approve or reject a chalet (Admin)",
          description:
            "Updates the approval status of a chalet. Only accessible by `admin` role. When approved, the chalet becomes visible to customers.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateChaletStatusRequest" },
              },
            },
          },
          responses: {
            "200": { description: "Status updated" },
            "401": { description: "Unauthorized" },
            "403": { description: "Forbidden — admin role required" },
            "404": { description: "Chalet not found" },
          },
        },
      },
      "/api/chalets/{id}/images": {
        post: {
          tags: ["Chalets"],
          summary: "Upload chalet images",
          description:
            "Uploads up to 5 images for a chalet via multipart/form-data. Images are stored on Cloudinary. Only the chalet owner can upload.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    images: {
                      type: "array",
                      items: { type: "string", format: "binary" },
                      description: "Up to 5 image files",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Images uploaded successfully" },
            "401": { description: "Unauthorized" },
            "403": { description: "Forbidden" },
          },
        },
      },
      // ══════════════════════════════════════════════════════════
      // BOOKINGS
      // ══════════════════════════════════════════════════════════
      "/api/bookings": {
        post: {
          tags: ["Bookings"],
          summary: "Create a booking",
          description:
            "Books a chalet for a specified date range. Automatically checks availability to prevent double-booking. `totalPrice` is calculated from chalet price × nights.",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateBookingRequest" },
              },
            },
          },
          responses: {
            "201": {
              description: "Booking created",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: { $ref: "#/components/schemas/Booking" },
                    },
                  },
                },
              },
            },
            "400": { description: "Validation error or chalet not available for requested dates" },
            "401": { description: "Unauthorized" },
            "403": { description: "Forbidden — customer role required" },
            "404": { description: "Chalet not found" },
          },
        },
      },
      "/api/bookings/my": {
        get: {
          tags: ["Bookings"],
          summary: "Get my bookings",
          description: "Returns all bookings made by the authenticated customer.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "List of customer bookings",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: { type: "array", items: { $ref: "#/components/schemas/Booking" } },
                    },
                  },
                },
              },
            },
            "401": { description: "Unauthorized" },
          },
        },
      },
      "/api/bookings/{id}": {
        get: {
          tags: ["Bookings"],
          summary: "Get booking by ID",
          description: "Returns a single booking. Customers can only access their own bookings.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Booking details",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: { $ref: "#/components/schemas/Booking" },
                    },
                  },
                },
              },
            },
            "401": { description: "Unauthorized" },
            "403": { description: "Forbidden" },
            "404": { description: "Booking not found" },
          },
        },
      },
      "/api/bookings/{id}/cancel": {
        patch: {
          tags: ["Bookings"],
          summary: "Cancel a booking",
          description:
            "Cancels an existing booking. Customers can only cancel their own bookings. Status changes to `cancelled`.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": { description: "Booking cancelled successfully" },
            "400": { description: "Booking is already cancelled or completed" },
            "401": { description: "Unauthorized" },
            "403": { description: "Forbidden" },
            "404": { description: "Booking not found" },
          },
        },
      },
      "/api/bookings/chalet/{chaletId}": {
        get: {
          tags: ["Bookings"],
          summary: "Get bookings for a chalet (Owner)",
          description: "Returns all bookings for a specific chalet. Only accessible by the chalet's owner.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "chaletId", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Chalet booking list",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: { type: "array", items: { $ref: "#/components/schemas/Booking" } },
                    },
                  },
                },
              },
            },
            "401": { description: "Unauthorized" },
            "403": { description: "Forbidden — owner role required" },
          },
        },
      },
      // ══════════════════════════════════════════════════════════
      // REVIEWS
      // ══════════════════════════════════════════════════════════
      "/api/reviews": {
        post: {
          tags: ["Reviews"],
          summary: "Create a review",
          description:
            "Posts a review for a chalet. Requires a valid `bookingId` — one review per booking (enforced by unique index). Automatically updates the chalet's `averageRating` and `reviewsCount`.",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateReviewRequest" },
              },
            },
          },
          responses: {
            "201": {
              description: "Review created",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: { $ref: "#/components/schemas/Review" },
                    },
                  },
                },
              },
            },
            "400": { description: "Already reviewed this booking or validation error" },
            "401": { description: "Unauthorized" },
            "403": { description: "Forbidden — customer role required" },
          },
        },
      },
      "/api/reviews/chalet/{chaletId}": {
        get: {
          tags: ["Reviews"],
          summary: "Get reviews for a chalet",
          description: "Returns all reviews for a specific chalet. Public endpoint — no authentication required.",
          parameters: [
            {
              name: "chaletId",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "MongoDB ObjectId of the chalet",
            },
          ],
          responses: {
            "200": {
              description: "List of reviews",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: { type: "array", items: { $ref: "#/components/schemas/Review" } },
                    },
                  },
                },
              },
            },
            "404": { description: "Chalet not found" },
          },
        },
      },
      // ══════════════════════════════════════════════════════════
      // SYSTEM
      // ══════════════════════════════════════════════════════════
      "/health": {
        get: {
          tags: ["System"],
          summary: "Health check",
          description: "Returns the current status of the API server and database connection.",
          responses: {
            "200": {
              description: "Server is healthy",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "ok" },
                      timestamp: { type: "string", format: "date-time" },
                      uptime: { type: "number", example: 3600 },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);