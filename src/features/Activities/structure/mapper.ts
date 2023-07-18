import { ActivityDTO } from "./dto"
import { Activity } from "./model"
import { v4 as uuidv4 } from 'uuid'

const toDomain = (dto: ActivityDTO): Activity => {
    return (
        new Activity(
            new Date().toString() + uuidv4(),
            dto.activity,
            dto.type,
            dto.participants,
        )
    )
}

export const ActivityMapper = {
    toDomain
}