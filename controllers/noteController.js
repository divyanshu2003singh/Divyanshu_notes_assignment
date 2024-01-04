// controllers/noteController.js
const Note = require('../models/Note');
const User = require('../models/User');
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.userId });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.userId });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, owner: req.userId });
    await note.save();
    res.status(201).json({ message: 'Note created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { title, content },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
     console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const shareNote = async (req, res) => {
    try {
      const { userId } = req;
      const { noteId, sharedUserId } = req.body;
  
      // Check if the note belongs to the authenticated user
      const note = await Note.findOne({ _id: noteId, owner: userId });
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
  
      // Check if the user to be shared with exists
      const sharedUser = await User.findById(sharedUserId);
      if (!sharedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the note is already shared with the user
      if (note.sharedWith.includes(sharedUserId)) {
        return res.status(400).json({ error: 'Note is already shared with the user' });
      }
  
      // Add the user to the sharedWith array
      note.sharedWith.push(sharedUserId);
      await note.save();
  
      res.json({ message: 'Note shared successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const searchNotes = async (req, res) => {
    try {
      const { userId } = req;
      const { q } = req.query;
  
      // Perform case-insensitive search on title and content fields
      const notes = await Note.find({
        owner: userId,
        $or: [
          { title: { $regex: new RegExp(q, 'i') } },
          { content: { $regex: new RegExp(q, 'i') } },
        ],
      });
  
      res.json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  shareNote,
  searchNotes,
};
