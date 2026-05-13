import "dotenv/config";
import mongoose from "mongoose";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import { foodModel } from "./models/foodModel.js";

// ── Cloudinary config ────────────────────────────────────────────────────────
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Upload an image from a public URL to Cloudinary.
 * Falls back to a placeholder if the URL fails.
 */
async function uploadFromUrl(url, publicId) {
    try {
        const result = await cloudinary.uploader.upload(url, {
            folder: "uploads",
            public_id: publicId,
            overwrite: true,
            resource_type: "image",
        });
        return result.secure_url;
    } catch (err) {
        console.warn(`  ⚠  Failed to upload "${publicId}" (${url}): ${err.message}`);
        // Return a reliable placeholder so the record is still created
        const fallback = await cloudinary.uploader.upload(
            `https://placehold.co/600x400/orange/white?text=${encodeURIComponent(publicId)}`,
            { folder: "uploads", public_id: `${publicId}_placeholder`, overwrite: true }
        );
        return fallback.secure_url;
    }
}

// ── Seed data ────────────────────────────────────────────────────────────────
// Images sourced from Unsplash (free, no-auth CDN links) and other open sources.
// Each entry: { name, description, price, category, quantity, imageUrl, imageId }

const foods = [
    // ── Salad ────────────────────────────────────────────────────────────────
    {
        name: "Caesar Salad",
        description: "Crisp romaine lettuce, parmesan shavings, croutons and classic Caesar dressing.",
        price: 8.99, category: "Salad", quantity: "350g",
        imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600",
        imageId: "caesar_salad",
    },
    {
        name: "Greek Salad",
        description: "Fresh tomatoes, cucumbers, olives, red onion and feta cheese with olive oil.",
        price: 7.99, category: "Salad", quantity: "320g",
        imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600",
        imageId: "greek_salad",
    },
    {
        name: "Caprese Salad",
        description: "Sliced mozzarella, ripe tomatoes and fresh basil drizzled with balsamic glaze.",
        price: 9.49, category: "Salad", quantity: "280g",
        imageUrl: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600",
        imageId: "caprese_salad",
    },
    {
        name: "Avocado Salad",
        description: "Creamy avocado, cherry tomatoes, corn and lime vinaigrette on mixed greens.",
        price: 10.49, category: "Salad", quantity: "300g",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
        imageId: "avocado_salad",
    },
    {
        name: "Nicoise Salad",
        description: "Tuna, green beans, boiled eggs, olives and potatoes with Dijon vinaigrette.",
        price: 11.99, category: "Salad", quantity: "400g",
        imageUrl: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600",
        imageId: "nicoise_salad",
    },

    // ── Rolls ────────────────────────────────────────────────────────────────
    {
        name: "Spring Rolls",
        description: "Crispy fried rolls stuffed with vegetables and glass noodles, served with sweet chili sauce.",
        price: 6.99, category: "Rolls", quantity: "4 pcs",
        imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600",
        imageId: "spring_rolls",
    },
    {
        name: "Chicken Wrap",
        description: "Grilled chicken, lettuce, tomato and garlic mayo wrapped in a soft flour tortilla.",
        price: 8.49, category: "Rolls", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600",
        imageId: "chicken_wrap",
    },
    {
        name: "Veggie Burrito",
        description: "Black beans, rice, roasted peppers, guacamole and salsa in a large flour tortilla.",
        price: 9.49, category: "Rolls", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600",
        imageId: "veggie_burrito",
    },
    {
        name: "Tuna Maki Roll",
        description: "Fresh tuna and cucumber rolled in seasoned sushi rice and nori.",
        price: 12.99, category: "Rolls", quantity: "8 pcs",
        imageUrl: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600",
        imageId: "tuna_maki",
    },
    {
        name: "Egg Roll",
        description: "Crispy egg roll filled with pork, cabbage and carrots, served with duck sauce.",
        price: 5.99, category: "Rolls", quantity: "3 pcs",
        imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600",
        imageId: "egg_roll",
    },

    // ── Deserts ──────────────────────────────────────────────────────────────
    {
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.",
        price: 7.99, category: "Deserts", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600",
        imageId: "lava_cake",
    },
    {
        name: "Tiramisu",
        description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream.",
        price: 6.99, category: "Deserts", quantity: "200g",
        imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600",
        imageId: "tiramisu",
    },
    {
        name: "Cheesecake",
        description: "New York-style cheesecake with a graham cracker crust and fresh berry compote.",
        price: 6.49, category: "Deserts", quantity: "180g",
        imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600",
        imageId: "cheesecake",
    },
    {
        name: "Crème Brûlée",
        description: "Silky vanilla custard topped with a perfectly caramelized sugar crust.",
        price: 7.49, category: "Deserts", quantity: "150g",
        imageUrl: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600",
        imageId: "creme_brulee",
    },
    {
        name: "Mango Sorbet",
        description: "Refreshing dairy-free sorbet made with real Alphonso mangoes.",
        price: 4.99, category: "Deserts", quantity: "120g",
        imageUrl: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600",
        imageId: "mango_sorbet",
    },
    {
        name: "Baklava",
        description: "Layers of flaky phyllo pastry filled with chopped nuts and soaked in honey syrup.",
        price: 5.49, category: "Deserts", quantity: "3 pcs",
        imageUrl: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600",
        imageId: "baklava",
    },

    // ── Sandwich ─────────────────────────────────────────────────────────────
    {
        name: "Club Sandwich",
        description: "Triple-decker with turkey, bacon, lettuce, tomato and mayo on toasted bread.",
        price: 9.99, category: "Sandwich", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600",
        imageId: "club_sandwich",
    },
    {
        name: "BLT Sandwich",
        description: "Crispy bacon, fresh lettuce and ripe tomato with mayo on sourdough.",
        price: 7.99, category: "Sandwich", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600",
        imageId: "blt_sandwich",
    },
    {
        name: "Grilled Cheese",
        description: "Golden-toasted sandwich with a blend of cheddar and gruyère cheeses.",
        price: 6.49, category: "Sandwich", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=600",
        imageId: "grilled_cheese",
    },
    {
        name: "Philly Cheesesteak",
        description: "Thinly sliced ribeye, sautéed onions and peppers smothered in provolone on a hoagie roll.",
        price: 12.99, category: "Sandwich", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600",
        imageId: "philly_cheesesteak",
    },
    {
        name: "Falafel Pita",
        description: "Crispy falafel balls, hummus, pickled vegetables and tahini in warm pita bread.",
        price: 8.49, category: "Sandwich", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600",
        imageId: "falafel_pita",
    },

    // ── Cake ─────────────────────────────────────────────────────────────────
    {
        name: "Red Velvet Cake",
        description: "Moist red velvet layers with cream cheese frosting and a hint of cocoa.",
        price: 5.99, category: "Cake", quantity: "1 slice",
        imageUrl: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600",
        imageId: "red_velvet_cake",
    },
    {
        name: "Carrot Cake",
        description: "Spiced carrot cake with walnuts and a generous cream cheese frosting.",
        price: 5.49, category: "Cake", quantity: "1 slice",
        imageUrl: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600",
        imageId: "carrot_cake",
    },
    {
        name: "Chocolate Fudge Cake",
        description: "Rich triple-chocolate cake with ganache filling and chocolate buttercream.",
        price: 6.49, category: "Cake", quantity: "1 slice",
        imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
        imageId: "chocolate_fudge_cake",
    },
    {
        name: "Lemon Drizzle Cake",
        description: "Light sponge cake soaked in lemon syrup and topped with a zesty lemon glaze.",
        price: 4.99, category: "Cake", quantity: "1 slice",
        imageUrl: "https://images.unsplash.com/photo-1519869325930-281384150729?w=600",
        imageId: "lemon_drizzle_cake",
    },
    {
        name: "Strawberry Shortcake",
        description: "Fluffy vanilla sponge layered with fresh strawberries and whipped cream.",
        price: 5.99, category: "Cake", quantity: "1 slice",
        imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600",
        imageId: "strawberry_shortcake",
    },

    // ── Pure Veg ─────────────────────────────────────────────────────────────
    {
        name: "Paneer Tikka",
        description: "Marinated cottage cheese cubes grilled in a tandoor with spiced yogurt coating.",
        price: 11.99, category: "Pure Veg", quantity: "300g",
        imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600",
        imageId: "paneer_tikka",
    },
    {
        name: "Dal Makhani",
        description: "Slow-cooked black lentils in a rich tomato-butter-cream sauce.",
        price: 9.99, category: "Pure Veg", quantity: "350g",
        imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600",
        imageId: "dal_makhani",
    },
    {
        name: "Vegetable Biryani",
        description: "Fragrant basmati rice cooked with seasonal vegetables and whole spices.",
        price: 10.99, category: "Pure Veg", quantity: "450g",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600",
        imageId: "veg_biryani",
    },
    {
        name: "Palak Paneer",
        description: "Creamy spinach gravy with soft paneer cubes, flavored with garlic and garam masala.",
        price: 10.49, category: "Pure Veg", quantity: "320g",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600",
        imageId: "palak_paneer",
    },
    {
        name: "Stuffed Bell Peppers",
        description: "Colorful bell peppers stuffed with spiced rice, beans and cheese, baked to perfection.",
        price: 9.49, category: "Pure Veg", quantity: "2 pcs",
        imageUrl: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600",
        imageId: "stuffed_peppers",
    },

    // ── Pasta ────────────────────────────────────────────────────────────────
    {
        name: "Spaghetti Carbonara",
        description: "Al dente spaghetti with crispy pancetta, egg yolk, pecorino and black pepper.",
        price: 13.99, category: "Pasta", quantity: "400g",
        imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600",
        imageId: "spaghetti_carbonara",
    },
    {
        name: "Penne Arrabbiata",
        description: "Penne pasta in a fiery tomato sauce with garlic, chili and fresh basil.",
        price: 11.49, category: "Pasta", quantity: "380g",
        imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
        imageId: "penne_arrabbiata",
    },
    {
        name: "Fettuccine Alfredo",
        description: "Silky fettuccine tossed in a rich parmesan and butter cream sauce.",
        price: 12.99, category: "Pasta", quantity: "400g",
        imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600",
        imageId: "fettuccine_alfredo",
    },
    {
        name: "Lasagna",
        description: "Layers of pasta, beef bolognese, béchamel and melted mozzarella, baked golden.",
        price: 14.99, category: "Pasta", quantity: "450g",
        imageUrl: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600",
        imageId: "lasagna",
    },
    {
        name: "Pesto Gnocchi",
        description: "Pillowy potato gnocchi tossed in homemade basil pesto with pine nuts.",
        price: 12.49, category: "Pasta", quantity: "350g",
        imageUrl: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600",
        imageId: "pesto_gnocchi",
    },
    {
        name: "Seafood Linguine",
        description: "Linguine with shrimp, mussels and calamari in a white wine garlic tomato sauce.",
        price: 16.99, category: "Pasta", quantity: "420g",
        imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600",
        imageId: "seafood_linguine",
    },

    // ── Noodles ──────────────────────────────────────────────────────────────
    {
        name: "Pad Thai",
        description: "Stir-fried rice noodles with shrimp, tofu, bean sprouts, peanuts and tamarind sauce.",
        price: 12.99, category: "Noodles", quantity: "380g",
        imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600",
        imageId: "pad_thai",
    },
    {
        name: "Ramen",
        description: "Rich tonkotsu broth with wheat noodles, chashu pork, soft-boiled egg and nori.",
        price: 14.99, category: "Noodles", quantity: "500g",
        imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600",
        imageId: "ramen",
    },
    {
        name: "Beef Chow Mein",
        description: "Crispy egg noodles stir-fried with tender beef strips and mixed vegetables.",
        price: 13.49, category: "Noodles", quantity: "400g",
        imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600",
        imageId: "beef_chow_mein",
    },
    {
        name: "Pho Bo",
        description: "Vietnamese beef noodle soup with star anise broth, rice noodles and fresh herbs.",
        price: 13.99, category: "Noodles", quantity: "500g",
        imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600",
        imageId: "pho_bo",
    },
    {
        name: "Dan Dan Noodles",
        description: "Spicy Sichuan noodles with minced pork, chili oil, sesame paste and scallions.",
        price: 11.99, category: "Noodles", quantity: "350g",
        imageUrl: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600",
        imageId: "dan_dan_noodles",
    },

    // ── Burger ───────────────────────────────────────────────────────────────
    {
        name: "Classic Cheeseburger",
        description: "Juicy beef patty with cheddar, lettuce, tomato, pickles and special sauce.",
        price: 10.99, category: "Burger", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
        imageId: "classic_cheeseburger",
    },
    {
        name: "BBQ Bacon Burger",
        description: "Smoked beef patty, crispy bacon, onion rings and smoky BBQ sauce.",
        price: 13.49, category: "Burger", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600",
        imageId: "bbq_bacon_burger",
    },
    {
        name: "Mushroom Swiss Burger",
        description: "Beef patty topped with sautéed mushrooms, Swiss cheese and garlic aioli.",
        price: 12.49, category: "Burger", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600",
        imageId: "mushroom_swiss_burger",
    },
    {
        name: "Crispy Chicken Burger",
        description: "Buttermilk fried chicken breast with coleslaw and honey mustard on a brioche bun.",
        price: 11.99, category: "Burger", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600",
        imageId: "crispy_chicken_burger",
    },
    {
        name: "Veggie Black Bean Burger",
        description: "Hearty black bean patty with avocado, roasted peppers and chipotle mayo.",
        price: 10.49, category: "Burger", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600",
        imageId: "veggie_burger",
    },
    {
        name: "Double Smash Burger",
        description: "Two smashed beef patties with American cheese, caramelized onions and pickles.",
        price: 14.99, category: "Burger", quantity: "1 pc",
        imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600",
        imageId: "double_smash_burger",
    },

    // ── Pizza ────────────────────────────────────────────────────────────────
    {
        name: "Margherita Pizza",
        description: "San Marzano tomato sauce, fresh mozzarella and basil on a thin Neapolitan crust.",
        price: 12.99, category: "Pizza", quantity: "10 inch",
        imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600",
        imageId: "margherita_pizza",
    },
    {
        name: "Pepperoni Pizza",
        description: "Classic tomato sauce, mozzarella and generous pepperoni slices.",
        price: 14.99, category: "Pizza", quantity: "10 inch",
        imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600",
        imageId: "pepperoni_pizza",
    },
    {
        name: "BBQ Chicken Pizza",
        description: "Smoky BBQ sauce, grilled chicken, red onion, cilantro and mozzarella.",
        price: 15.99, category: "Pizza", quantity: "10 inch",
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
        imageId: "bbq_chicken_pizza",
    },
    {
        name: "Four Cheese Pizza",
        description: "Mozzarella, gorgonzola, parmesan and ricotta on a garlic-brushed crust.",
        price: 15.49, category: "Pizza", quantity: "10 inch",
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
        imageId: "four_cheese_pizza",
    },
    {
        name: "Veggie Supreme Pizza",
        description: "Bell peppers, mushrooms, olives, onions and spinach on tomato sauce.",
        price: 13.99, category: "Pizza", quantity: "10 inch",
        imageUrl: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600",
        imageId: "veggie_supreme_pizza",
    },
    {
        name: "Prosciutto Arugula Pizza",
        description: "Thin-crust pizza with prosciutto, fresh arugula, shaved parmesan and truffle oil.",
        price: 17.99, category: "Pizza", quantity: "10 inch",
        imageUrl: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600",
        imageId: "prosciutto_pizza",
    },
];

// ── Main seeder ──────────────────────────────────────────────────────────────
async function seed() {
    console.log("🔌 Connecting to MongoDB…");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected\n");

    // Optional: wipe existing food documents before seeding
    const existing = await foodModel.countDocuments();
    if (existing > 0) {
        console.log(`⚠  Found ${existing} existing food records. Clearing them…`);
        await foodModel.deleteMany({});
        console.log("🗑  Cleared.\n");
    }

    const results = [];

    for (const food of foods) {
        process.stdout.write(`📤 Uploading image for "${food.name}"… `);
        const imageUrl = await uploadFromUrl(food.imageUrl, food.imageId);
        console.log("done");

        const doc = await foodModel.create({
            name: food.name,
            description: food.description,
            price: food.price,
            category: food.category,
            quantity: food.quantity,
            image: imageUrl,
        });

        results.push(doc);
        console.log(`   ✅ Saved: ${doc.name} (${doc.category}) — $${doc.price}`);
    }

    console.log(`\n🎉 Seeded ${results.length} food items successfully!`);
    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    mongoose.disconnect();
    process.exit(1);
});
