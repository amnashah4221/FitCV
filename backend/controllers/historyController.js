const History = require('../models/History');

const getHistory = async (req, res) => {
    try{
        const history = await History.find({user: req.user.id})
        .sort({ createdAt: -1 })
        .select('-__v')

        res.status(200).json({ history });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving history', error });
    }
}

const getHistoryById = async (req, res) => {

    try{
        const item = await History.findOne({
            _id: req.params.id,
            user: req.user.id
        })
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ item });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving history by ID', error });
    }
}

const deleteHistoryById = async (req, res) => {
    try{
        const item = await History.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting history by ID', error });
    }
}

module.exports = { getHistory, getHistoryById, deleteHistoryById };