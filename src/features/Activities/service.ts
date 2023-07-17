import { FailureResponse } from "../../connection/FailureResponse";
import { DEFAULT_API_ERROR_RESPONSE } from "../../common/common";
import { BASE_URL } from "../../connection/baseUrl";
import { ActivityDTO } from "./dto";
import { ActivityMapper } from "./mapper";
import { Activity, ActivityFilter } from "./model";

let controller: AbortController | null = null;

export const getActivity = async (filters?: ActivityFilter): Promise<Activity | FailureResponse> => {
    if (controller) {
        controller.abort();
    }
    controller = new AbortController();
    const { signal } = controller;

    let url = BASE_URL;
    if (filters) {
        url += `?type=${filters.type ?? ''}&participants=${filters.participants ?? ''}`;
    }

    try {
        const response = await fetch(url, { signal });
        const data: ActivityDTO = await response.json() as ActivityDTO;
        return ActivityMapper.toDomain(data);
    } catch (error) {
        return DEFAULT_API_ERROR_RESPONSE
    }
};

export const cancelGetActivity = (): void => {
    if (controller) {
        controller.abort();
        controller = null;
    }
};
