import type { ICandidate } from "@/types/candidate";
import request from "@/utils/request";

export function vote (params: ICandidate[]) {
    return request({
        url: '/api/users/login',
        method: 'post',
        data: params,
    })
}