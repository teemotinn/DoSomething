export class Activity {
    key: string;
    activity: string;
    type: string;
    participants: number;

    constructor(
        key: string,
        activity: string,
        type: string,
        participants: number,
    ) {
        this.key = key;
        this.activity = activity;
        this.participants = participants;
        this.type = type
    }
}

export class ActivityFilter {
    type?: string;
    participants?: string;
    constructor(
        type?: string,
        participants?: string
    ) {
        this.type = type;
        this.participants = participants
    }
}

export const ACTIVITY_TYPES = [
    "education",
    "recreational",
    "social",
    "diy",
    "charity",
    "cooking",
    "relaxation",
    "music",
    "busywork"
]
