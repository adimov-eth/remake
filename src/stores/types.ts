


export interface User {
    /**
     * True, if this user added the bot to the attachment menu.
     */
    addedToAttachmentMenu?: boolean;
    /**
     * True, if this user allowed the bot to message them.
     */
    allowsWriteToPm?: boolean;
    /**
     * First name of the user or bot.
     */
    firstName: string;
    /**
     * A unique identifier for the user or bot.
     */
    id: number;
    /**
     * True, if this user is a bot. Returned in the `receiver` field only.
     * @see InitDataParsed.receiver
     */
    isBot?: boolean;
    /**
     * True, if this user is a Telegram Premium user.
     */
    isPremium?: boolean;
    /**
     * Last name of the user or bot.
     */
    lastName?: string;
    /**
     * [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the user's language.
     * Returns in user field only.
     */
    languageCode?: string;
    /**
     * URL of the user’s profile photo. The photo can be in .jpeg or .svg
     * formats. Only returned for Mini Apps launched from the attachment menu.
     */
    photoUrl?: string;
    /**
     * Username of the user or bot.
     */
    username?: string;
}



