import { FailureResponse } from "../../common/FailureResponse";
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
        return new FailureResponse('Something went wrong!')
    }
};

export const cancelGetActivity = (): void => {
    if (controller) {
        controller.abort();
        controller = null;
    }
};