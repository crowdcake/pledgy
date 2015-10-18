var mongoose = require('mongoose');

module.exports = mongoose.model('Project', {
    archive_reason: String,
    archived: Boolean,
    current: Number,
    description: String,
    goal: Number,
    name: String,
    owner:  String,
    pledges: Array,
    subtitle:  String,
    created: Date
});
