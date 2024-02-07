import type { ICandidate } from "@/types/candidate";
import request from "@/utils/request";

export function vote (params: ICandidate[]) {
    return request({
        url: '/api/vote',
        method: 'post',
        data: params,
    })
}