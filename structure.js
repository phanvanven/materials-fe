// for each user, we have the following structure: USER
{
    ID: String  // not null | user id
    avatar: String
    name: String // not null
    email: { 0: String, 1: Boolean } // not null | the value of field 2 makes it possible for us to hide user information
    phone: { 0: String, 1: Boolean }
    birth: { 0: Date, 1: Boolean } 
    address: { 0: String, 1: Boolean }
    job: { 0: [String], 1: Boolean }
    biography: { 0: String, 1: Boolean }
    hobbies: { 0: [String], 1: Boolean }
}

// for each conversation, we have the following structure: CONVERSATION
{
    ID: String  //not null | [combination between two user ids | auto generated]
    // conversation list
    conversations: [
        {
            content: {
                text: String,
                type: String
            },
            date: Date,
            username: String,
            userID: String
        }
    ]
}

// for each room, we have the following structure: ROOM (chat and record video)
{
    ID: String// not null | room id
    name: String// not null | room name
    avatar: String 
    users: [String]// not null | list of users who joined the chat room
    conversations: String// not null | link to conversation table
    public: Boolean // not null | default value is 1 corresponding to public room and vice versa
    pass: String // [not null | null] | if the value of the public key is 0 then the pass must have data
    type: Boolean // | 1: there are videos, vice versa
}

// for each post, we have the following structure: POSTS
{
    ID: String // not null | post id
    userID: String // not null | link to user table
    // post list
    post: {
        content: String
        date: Date
        images: [String]
        video: String // only 1 video can be uploaded per post
        isShared: Boolean
    }
}

// for each comment, we have the following structure: COMMENTS
{
    ID: String // not null
    postID: String // not null | link to post table
    userID: String // not null | link to user table
    comment: String
    like: String
    date: Date
}

// for each shared post, we have the following structure: SHAREDPOST
{
    ID: String // not null
    userID: String // not null | link to user table
    postUserID: String // not null | link to user table
    postID: String // not null | link to post table
}

// for each Statistical table, we have the following structure: STATISTICALTABLES
{
    ID: String // not null
    userID: String // not null | link to user table
    posts: Number
    likes: Number
    messages: Number
    friends: Number
    followers: Number
    following: Number
    uploads: Number
    downloads: Number
    shares: Number
    onlineTime: Number
}

// friends
{
    ID: String // not null
    userID: String // not null | link to user table
    friends: [String]
}

// Storages
{
    ID: String
    userID: String
    images: [
        {
            path: String
            name: String
            extension: String
            date: Date
        }
    ]
    videos: [
        {
            path: String
            name: String
            extension: String
            date: Date
        }
    ]
    files: [
        {
            path: String
            name: String
            extension: String
            date: Date
        }
    ]
}

// Calendars
{
    ID: String
    userID: String
    
}