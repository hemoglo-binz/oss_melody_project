export default function Api(melon = 0) {
    if (melon === 0) {
        return "https://67531e1df3754fcea7bad5b9.mockapi.io/c/comm";
    } else {
        return "https://lv4bbrq1kg.execute-api.ap-northeast-2.amazonaws.com/api/melonAPI";
    }
}
