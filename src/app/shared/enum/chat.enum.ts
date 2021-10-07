export enum ChatReadState{
    UNREAD="unread",
    READ="read"
}

export enum MessageContentType
{
    UNKNOW_MESSAGE=0,
    TEXT_MESSAGE=1,
    HTML_MESSAGE=2,
    VOICE_MESSAGE=3,
    IMAGE_MESSAGE=4,
    AUDIO_MESSAGE=5,
    VIDEO_MESSAGE=6,
    DOCUMENT_MESSAGE=7,
    FILE_MESSAGE=8,
}

export enum DiscussionType
{
    GROUP_DISCUSSION="group_discussion",
    PRIVATE_DISCUSSION="private_discussion"
}

export enum MessageSendState
{
    TRYING_SENDING="trying_sending",
    SEND="send",
    RECEIVED="received",
    READ="read"
}
