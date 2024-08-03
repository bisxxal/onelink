import mongoose from "mongoose";

 const EventSchema = new mongoose.Schema({
    type: String, // click or view
    page: String, // for example "bishal"
    uri: String, // /bishal | https://
},{timestamps: true});

export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);