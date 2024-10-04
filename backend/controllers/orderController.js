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
        const newOrder = new orderModel({
            userId: request.body.userId,
            items: request.body.items,
            amount: request.body.amount,
            address: request.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(request.body.userId, { cartData: {} });

        const line_items = request.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // convert to paise
            },
            quantity: item.quantity,
        }));

        // Add delivery charge as a separate item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100, // Rs. 2 delivery charge
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        console.log("Stripe session created:", session); // Log session for debugging
        response.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error); // Log detailed error
        response.status(500).json({ success: false, message: "Error placing order" });
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

export { placeOrder, verifyOrder, userOrders };