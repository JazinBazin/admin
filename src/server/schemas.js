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
        required: false,
        ref: 'PublicationPlace',
    },
    authors: [{ author: String }],
    subdivisions: [String],
    file: {
        type: String,
        required: true
    }
},
    { versionKey: false });

exports.programmSchema = new Schema(
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
        authors: [{ author: String }],
        subdivisions: [String],
        file: {
            type: String,
            required: true
        }
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
        authors: [{ author: String }],
        subdivisions: [String],
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
        headPerformer: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        authors: [{ author: String }],
        // subdivisions: [String],
        file: {
            type: String,
            required: true
        }
    },
    { versionKey: false });

exports.developmentWorkSchema = new Schema(
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
        headPerformer: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        authors: [{ author: String }],
        file: {
            type: String,
            required: true
        }
    },
    { versionKey: false });

exports.projectsSchema = new Schema(
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
        headPerformer: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        authors: [{ author: String }],
        file: {
            type: String,
            required: true
        }
    },
    { versionKey: false });

exports.abstractSchema = new Schema(
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
        authors: [{ author: String }],
        subdivisions: [String],
        file: {
            type: String,
            required: true
        }
    },
    { versionKey: false });

exports.approbationSchema = new Schema(
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
        headPerformer: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
        },
        authors: [{ author: String }],
        file: {
            type: String,
            required: true
        }
    },
    { versionKey: false });

exports.verificationSchema = new Schema(
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
        headPerformer: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
        },
        authors: [{ author: String }],
        file: {
            type: String,
            required: true
        }
    },
    { versionKey: false });

exports.patentsSchema = new Schema(
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
        authors: [{ author: String }],
        subdivisions: [String],
        file: {
            type: String,
            required: true
        }
    },
    { versionKey: false });

exports.subdivisionSchema = new Schema({
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