const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    likedTracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
    queue: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);