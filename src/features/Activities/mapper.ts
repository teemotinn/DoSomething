import { ActivityDTO } from "./dto";
import { Activity } from "./model";

const toDomain = (dto: ActivityDTO): Activity => {
    return (
        new Activity(
            dto.activity,
            dto.type,
            dto.participants,
            dto.price,
            dto.link,
            dto.key,
            dto.accessibility,
        )
    )
}

export const ActivityMapper = {
    toDomain
}