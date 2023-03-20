import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

//CREATE
export const createHotel = async (req, res, next) => {
    
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)

    }catch(err) {
        next(err);
    }
}

//UPDATE
export const updateHotel = async (req, res, next) => {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, 
            { $set: req.body },
            { new: true });
        res.status(200).json(updatedHotel);

    }catch(err) {
        next(err);
    }
};

//DELETE

export const deleteHotel = async (req, res, next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted!");

    }catch(err) {
        next(err);
    }
};

//GET
export const getHotel = async (req, res) => {

    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);

    }catch(err) {
        next(err);
    }
};

//GET ALL
export const getAllHotels = async (req, res) => {

    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);

    }catch(err) {
        next(err);
    }
};

//GET COUNT BY CITY
export const countByCity = async (req, res) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            // return Hotel.find( { city: city }).length;
            return Hotel.countDocuments({ city: city })
        }));
        res.status(200).json(list);

    }catch(err) {
        next(err);
    }
};

//GET COUNT BY TYPE
export const countByType = async (req, res) => {
    const types = req.query.types.split(",")
    try {
        const list = await Promise.all(types.map(type => {
            return Hotel.countDocuments({ type: type })
        }))
        res.status(200).json(list);

    }catch(err) {
        next(err);
    }
};
export default router
