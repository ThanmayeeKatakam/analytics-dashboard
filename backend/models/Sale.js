const mongoose= require("mongoose");

const saleSchema = new mongoose.Schema({

        productName:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        amount:{
            type: Number,
            required:true
        },
        quantity:{
            type: Number,
            required: true
        },
        status:{
            type: String,
            enum: ["Completed", "Pending", "Cancelled"],
            default: "Completed"
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
    },   
    { timestamps: true}
);

const Sale= mongoose.model("Sale", saleSchema);

module.exports= Sale;