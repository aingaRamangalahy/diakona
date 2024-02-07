import request from "@/utils/request";

export function importCandidates (formData: FormData) {
    return request({
        url: '/api/users/import',
        method: 'post',
        data: formData
    })
}