export default function Api(melon = 0) {
    if (melon === 0) {
        return "https://672881f2270bd0b97555cd4e.mockapi.io/api/crud";
    } else {
        return "https://lv4bbrq1kg.execute-api.ap-northeast-2.amazonaws.com/api/melonAPI";
    }
}
