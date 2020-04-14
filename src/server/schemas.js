const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.articleSchema = new Schema({
    headline: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        required: true
    },
    firstCreationDate: {
        type: Date,
        required: true
    },
    publicationPlace: {
        type: Schema.Types.ObjectId,
        ref: 'PublicationPlace'
    },
    rota: {
        type: Number,
        required: false,
        min: 1
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department"
    },
    authors: [{ author: String }],
    file: {
        type: String,
        required: true
    }
},
    { versionKey: false });

exports.departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    firstCreationDate: {
        type: Date,
        required: true
    },
},
    { versionKey: false });

exports.programmSchema = new Schema(
    {
        headline: {
            type: String,
            required: true,
            maxlength: 100
        },
        description: {
            type: String,
            required: true,
            maxlength: 5000
        },
        creationDate: {
            type: Date,
            required: true
        },
        firstCreationDate: {
            type: Date,
            required: true
        },
        rota: {
            type: Number,
            required: false,
            min: 1
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department"
        },
        authors: [{ author: String }],
        file: {
            type: String,
            required: true
        }
    },
    { versionKey: false });

exports.publicationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    firstCreationDate: {
        type: Date,
        required: true
    },
},
    { versionKey: false });

exports.rationalizationSchema = new Schema(
    {
        headline: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        creationDate: {
            type: Date,
            required: true
        },
        firstCreationDate: {
            type: Date,
            required: true
        },
        rota: {
            type: Number,
            required: false,
            min: 1
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department"
        },
        authors: [{ author: String }],
        file: {
            type: String,
            required: true
        }
    },
    { versionKey: false });

exports.researchSchema = new Schema(
    {
        headline: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        creationDate: {
            type: Date,
            required: true
        },
        firstCreationDate: {
            type: Date,
            required: true
        },
        rota: {
            type: Number,
            required: false,
            min: 1
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department"
        },
        authors: [{ author: String }],
        file: {
            type: String,
            required: true
        }
    },
    { versionKey: false });

exports.userSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    firstCreationDate: {
        type: Date,
        required: true
    },
},
    { versionKey: false });