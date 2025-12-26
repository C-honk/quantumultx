const url = "https://my.ippure.com/v1/info";
const opts = { policy: $environment.params };

const myRequest = {
    url: url,
    headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
    },
    opts: opts,
    timeout: 5000
};

const countryMap = {
    "HK": "香港",
    "TW": "台湾",
    "KR": "韩国",
    "JP": "日本",
    "DE": "德国",
    "FR": "法国",
    "GB": "英国",
    "US": "美国",
    "SG": "新加坡",
    "AU": "澳大利亚",
    "CA": "加拿大",
    "RU": "俄罗斯",
    "IN": "印度",
    "IT": "意大利",
    "ES": "西班牙",
    "BR": "巴西",
    "NL": "荷兰",
    "CH": "瑞士",
    "SE": "瑞典",
    "NO": "挪威",
    "DK": "丹麦",
    "FI": "芬兰",
    "PL": "波兰",
    "UA": "乌克兰",
    "MX": "墨西哥",
    "AE": "阿联酋",
    "SA": "沙特阿拉伯",
    "TR": "土耳其",
    "AR": "阿根廷",
    "ZA": "南非",
    "NZ": "新西兰",
    "MY": "马来西亚",
    "TH": "泰国",
    "PH": "菲律宾",
    "VN": "越南",
    "ID": "印度尼西亚"
};

$task.fetch(myRequest).then(response => {
    try {
        const data = JSON.parse(response.body);
        const htmlMessage = generateHtmlMessage(data);
        $done({ title: "查询结果", htmlMessage });
    } catch (e) {
        handleError("解析失败");
    }
}, reason => {
    handleError("查询超时");
});

function handleError(msg) {
    const message = `<p style="text-align:center;font-family:-apple-system;font-size:15px;color:#000;">${msg}</p>`;
    $done({ title: "查询失败", htmlMessage: message });
}

function generateHtmlMessage(data) {
    const countryName = countryMap[data.countryCode] || data.countryCode || "N/A";

    const items = [
        { label: "IP", value: data.ip || "N/A", separator: "：" },
        { label: "地区", value: countryName, separator: "：" },
        { label: "欺诈", value: `${data.fraudScore || 0}分`, separator: "：" },
        { label: "风险", value: getRiskLevel(data.fraudScore || 0), separator: "：" },
        { label: "节点", value: $environment.params, separator: "：", color: "#FFFFFF" }
    ];

    const res = items.map(item => {
        const color = item.color || "#000";
        const prefix = item.label === "节点" ? "<br/>" : "";
        return `${prefix}<span style="color:${color};">${item.label}${item.separator}${item.value}</span>`;
    }).join("<br/>");

    return `<div style="text-align:left;font-family:-apple-system;font-size:16px;line-height:1.2;">
                <hr style="margin:1px 0;border:5;border-top:5px solid #ddd;"/>
                ${res}
                <hr style="margin:1px 0;border:5;border-top:5px solid #ddd;"/>
            </div>`;
}

function getRiskLevel(score) {
    if (score <= 25) return "<span style='color:#28a745'>安全</span>";
    if (score <= 50) return "<span style='color:#ffc107'>中等</span>";
    if (score <= 75) return "<span style='color:#ff8c00'>高危</span>";
    return "<span style='color:#dc3545'>极高</span>";
}
