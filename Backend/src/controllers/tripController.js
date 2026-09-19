import {Property} from "../Models/propertyModel.js";
import {planTrip} from "../ai/tripPlanner.js";
import {generateDescription} from "../ai/generateDescription.js";

const cleanCity=(text) => text.toLowerCase().replaceAll(" ","")

const createTripPlan = async (req, res) => {
    try {
        const {destination, budget, days, people, interests } = req.body;
        if (!destination || !budget || !days || !people || !interests) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields. Please provide destination, budget, days, people, and interests."
            })
        }
        const plan=await planTrip({
            destination, budget, days, people, interests:interests||[]
        });
        const perNight=Number(budget)/Number(days);
        const city=cleanCity(destination);
        const properties=await Property.find({
            $or:[
                {"address.city":city},
                {"address.state":city},
                {"address.area":city}
            ],
            price:{$lte:perNight},
            maximumGuests:{$gte:Number(people)},
        }).limit(6);
        res.status(200).json({
            status: "success",
            data: {
                plan,
                properties,
                perNight
            }
        });
    }
    catch (error) {
        console.error("Error creating trip plan:", error);
        res.status(500).json({
            status:"fail",
            message: "Internal server error."
        });
    }
};


const writeDescription = async (req, res) => {
    try {
        const description = await generateDescription(req.body);
        return res.status(200).json({
                status: "success",
                data:{description}
            })
    }
    catch (error) {
        res.status(500).json({
            status:"fail",
            message: "Internal server error."
        });
    }
};

export {createTripPlan,writeDescription};