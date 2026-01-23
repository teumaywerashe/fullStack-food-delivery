const swaggerDocument = {
    openapi: "3.0.3",
    info: {
        title: "Food Delivery API",
        description: "API documentation for the Food Delivery project",
        version: "1.0.0",
    },
    servers: [{
        // Use an environment variable to set the base URL for docs (useful for staging/production)
        url: process.env.NODE_ENV === "production" ?
            process.env.SWAGGER_SERVER_URL : `http://localhost:${process.env.PORT || 3000}`,
    }, ],
    security: [{ bearerAuth: [] }],
    paths: {
        "/": {
            get: {
                summary: "Root health check",
                responses: { 200: { description: "Server running" } },
            },
        },
        "/api/user/register": {
            post: {
                summary: "Register a new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/UserRegister" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Registration result",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/AuthResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/user/login": {
            post: {
                summary: "Login user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/UserLogin" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Login result with token",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/AuthResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/user": {
            get: {
                summary: "Get all users (non-password fields)",
                responses: {
                    200: {
                        description: "Users list",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        users: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/User" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/food/add": {
            post: {
                summary: "Add a new food item (requires auth)",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    description: { type: "string" },
                                    price: { type: "number" },
                                    category: { type: "string" },
                                    quantity: { type: "string" },
                                    image: { type: "string", format: "binary" },
                                },
                                required: [
                                    "name",
                                    "description",
                                    "price",
                                    "category",
                                    "quantity",
                                    "image",
                                ],
                            },
                        },
                    },
                },
                responses: { 201: { description: "Food added" } },
            },
        },
        "/api/food/list": {
            get: {
                summary: "List all food items",
                responses: {
                    200: {
                        description: "List of foods",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        foods: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/Food" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/food/remove/{id}": {
            delete: {
                summary: "Remove a food item by id",
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                }, ],
                responses: { 200: { description: "Removed" } },
            },
        },
        "/api/cart/add": {
            post: {
                summary: "Add item to cart (auth required)",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: { itemId: { type: "string" } },
                                required: ["itemId"],
                            },
                        },
                    },
                },
                responses: { 200: { description: "Added to cart" } },
            },
        },
        "/api/cart/get": {
            get: {
                summary: "Get current user's cart (auth required)",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Cart data",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        cartData: { type: "object" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/cart/remove": {
            delete: {
                summary: "Remove item from cart (auth required)",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: { itemId: { type: "string" } },
                                required: ["itemId"],
                            },
                        },
                    },
                },
                responses: { 200: { description: "Removed from cart" } },
            },
        },
        "/api/order/place": {
            post: {
                summary: "Place an order and initialize payment (auth required)",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/OrderCreate" },
                        },
                    },
                },
                responses: { 200: { description: "Payment checkout URL" } },
            },
        },
        "/api/order/verify": {
            post: {
                summary: "Verify payment for an order",
                parameters: [{
                    name: "ordersId",
                    in: "query",
                    required: true,
                    schema: { type: "string" },
                }, ],
                responses: { 200: { description: "Verification result" } },
            },
        },
        "/api/order/userOrder": {
            get: {
                summary: "Get orders for authenticated user",
                security: [{ bearerAuth: [] }],
                responses: { 200: { description: "User orders" } },
            },
        },
        "/api/order/status": {
            post: {
                summary: "Update order status (auth required)",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    orderId: { type: "string" },
                                    status: { type: "string" },
                                },
                                required: ["orderId", "status"],
                            },
                        },
                    },
                },
                responses: { 200: { description: "Status updated" } },
            },
        },
        "/api/order/list": {
            get: {
                summary: "Get list of all orders (auth required)",
                security: [{ bearerAuth: [] }],
                responses: { 200: { description: "Orders list" } },
            },
        },
        "/api/notification": {
            post: {
                summary: "Create notification",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/NotificationCreate" },
                        },
                    },
                },
                responses: { 201: { description: "Notification created" } },
            },
            get: {
                summary: "Get all notifications",
                responses: { 200: { description: "Notifications list" } },
            },
        },
        "/api/notification/{id}": {
            get: {
                summary: "Get notifications for a specific recipient id",
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                }, ],
                responses: { 200: { description: "Notifications for recipient" } },
            },
            delete: {
                summary: "Delete a notification by id",
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                }, ],
                responses: { 200: { description: "Deleted" } },
            },
            patch: {
                summary: "Mark notification as read",
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                }, ],
                responses: { 201: { description: "Updated" } },
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        },
        schemas: {
            UserRegister: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                },
                required: ["name", "email", "password"],
            },
            UserLogin: {
                type: "object",
                properties: { email: { type: "string" }, password: { type: "string" } },
                required: ["email", "password"],
            },
            User: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    name: { type: "string" },
                    email: { type: "string" },
                    role: { type: "string" },
                    cart: { type: "object" },
                },
            },
            AuthResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean" },
                    token: { type: "string" },
                    user: { $ref: "#/components/schemas/User" },
                },
            },
            Food: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    ownerId: { type: "string" },
                    name: { type: "string" },
                    description: { type: "string" },
                    price: { type: "number" },
                    image: { type: "string" },
                    category: { type: "string" },
                    quantity: { type: "string" },
                },
            },
            OrderCreate: {
                type: "object",
                properties: {
                    items: { type: "array", items: { type: "object" } },
                    amount: { type: "number" },
                    address: { type: "object" },
                    email: { type: "string" },
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                },
                required: ["items", "amount", "address"],
            },
            NotificationCreate: {
                type: "object",
                properties: { to: { type: "string" }, content: { type: "string" } },
                required: ["to", "content"],
            },
        },
    },
};

export default swaggerDocument;