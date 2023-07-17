export class MinimumActivity {

    activity: string;
    type: string;
    participants: number;

    constructor(
        activity: string,
        type: string,
        participants: number,
    ) {
        this.activity = activity;
        this.participants = participants;
        this.type = type
    }
}

export class Activity extends MinimumActivity {

    price: number;
    link: string;
    key: string;
    accessibility: number;

    constructor(
        activity: string,
        type: string,
        participants: number,
        price: number,
        link: string,
        key: string,
        accessibility: number
    ) {
        super(activity, type, participants);
        this.price = price;
        this.link = link;
        this.key = key;
        this.accessibility = accessibility;
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
