import { DEFAULT_API_ERROR_RESPONSE } from "../../../common/common"
import { FailureResponse } from "../../../connection/FailureResponse"
import { BASE_URL } from "../../../connection/baseUrl"
import { ActivityDTO } from "./dto"
import { ActivityMapper } from "./mapper"
import { Activity, ActivityFilter } from "./model"

let controller: AbortController | null = null

const getActivity = async (filters?: ActivityFilter): Promise<Activity | FailureResponse> => {
    if (controller) {
        controller.abort()
    }
    controller = new AbortController()
    const { signal } = controller

    let url = BASE_URL
    if (filters) {
        url += `?type=${filters.type ?? ''}&participants=${filters.participants ?? ''}`
    }

    try {
        const response = await fetch(url, { signal })
        console.log(response)
        const data: ActivityDTO = await response.json() as ActivityDTO
        if (data.error) {
            return new FailureResponse(data.error)
        }
        return ActivityMapper.toDomain(data)
    } catch (error) {
        return DEFAULT_API_ERROR_RESPONSE
    }
}

const cancelGetActivity = (): void => {
    if (controller) {
        controller.abort()
        controller = null
    }
}

export const ActivityService = {
    getActivity,
    cancelGetActivity
}
