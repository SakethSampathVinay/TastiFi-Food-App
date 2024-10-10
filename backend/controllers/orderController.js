import dotenv from "dotenv";
dotenv.config();
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placeOrder = async (request, response) => {
    const frontend_url = "https://tasti-fi.vercel.app"; // your frontend URL
    try {
        // Step 1: Save new order
        const newOrder = new orderModel({
            userId: request.body.userId,
            items: request.body.items,
            amount: request.body.amount,
            address: request.body.address
        });
        await newOrder.save().catch((err) => {
            console.error("Error saving order:", err);
            throw new Error("Order creation failed");
        });

        // Step 2: Update user's cart
        await userModel.findByIdAndUpdate(request.body.userId, { cartData: {} }).catch((err) => {
            console.error("Error updating user cart:", err);
            throw new Error("Cart update failed");
        });

        // Step 3: Map line items for Stripe
        const line_items = request.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100), // convert to cents
            },
            quantity: item.quantity,
        }));

        // Add delivery charge as a separate item
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100, // fixed $2 delivery charge
            },
            quantity: 1,
        });

        // Step 4: Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        }).catch((err) => {
            console.error("Error creating Stripe session:", err);
            throw new Error("Stripe session creation failed");
        });

        // Respond with session URL
        response.status(200).json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error.message); // This logs the specific error message
        response.status(500).json({ success: false, message: error.message });
    }
};


const verifyOrder = async (request, response) => {
    const { orderId, success } = request.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            response.json({ success: true, message: "Order Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            response.json({ success: false, message: "Order Not Paid" });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        response.status(500).json({ success: false, message: "Error verifying order" });
    }
};

// User orders for frontend
const userOrders = async (request, response) => {
    try {
        const orders = await orderModel.find({ userId: request.body.userId });
        response.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        response.status(500).json({ success: false, message: "Error fetching orders" });
    }
};


// Listing orders for Admin Panel

const listOrders = async (request, response) => {
    try {
        const orders = await orderModel.find({})
        response.json({success: true, data: orders})
    } catch(error) {
        console.log(error)
        response.json({success: false, message: "Error"})
    }
}

// api for updating order status

const updateStatus = async (request, response) => {
    try {
        await orderModel.findByIdAndUpdate(request.body.orderId, {status: request.body.status})
        response.json({success: true, message: "Status Updated"})
    } catch(error) {
        console.log(error)
        response.json({success: false, message: "Error"})
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus};